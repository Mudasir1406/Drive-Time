import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Callout, LatLng, Marker, Polyline} from 'react-native-maps';
import getDistance from 'geolib/es/getPreciseDistance';
import {requestCameraPermission} from '../../utils/camera-permission';
import {colors} from '../../constant';
import {requestLocationPermission} from '../../utils/camera-permission';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import {
  getRides,
  updateAndPushData,
  updateDriverLocation,
} from '../../services/firebase-realtime/rides-services';
import {Timestamp} from '@react-native-firebase/firestore';
import OfferCard from '../../components/common/offer-card';
import {MyObjectType} from '../../types/types';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import axios from 'axios';
import {LatLangProps} from '../user/search-rides';
import {decodePolyline} from '../../utils/map-functions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560';
const FindRides = () => {
  const [currentLong, setCurrentLong] = useState(0);
  const [currentLat, setCurrentLat] = useState(0);
  const [offers, setOffers] = useState<MyObjectType[]>();
  const mapRef = useRef<MapView | null>(null);
  const userData = useSelector((state: StoreState) => state.user);
  const prevPositionRef = useRef<{latitude: number; longitude: number} | null>(
    null,
  );
  const [selectedOffer, setselectedOffer] = useState<MyObjectType>();
  const [routeCoords, setRouteCoords] = useState<any[]>([]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371000; // Radius of the Earth in meters

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        // Update state
        setCurrentLat(latitude);
        setCurrentLong(longitude);

        if (selectedOffer && prevPositionRef.current) {
          const prevLat = prevPositionRef.current.latitude;
          const prevLong = prevPositionRef.current.longitude;
          const distance = calculateDistance(
            prevLat,
            prevLong,
            latitude,
            longitude,
          );

          if (distance > 5) {
            updateDriverLocation(selectedOffer.uid, latitude, longitude);
          }
        }
        // Update the map view
        mapRef.current?.animateToRegion(
          {
            latitude,
            longitude,
            longitudeDelta: 0.05,
            latitudeDelta: 0.05,
          },
          500,
        );

        // Update the previous position ref
        prevPositionRef.current = {latitude, longitude};
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const handleOfferAccept = (doc: MyObjectType) => {
    setselectedOffer(doc);
    updateAndPushData(
      doc?.uid,
      'Offer_accepted',
      doc,
      userData,
      currentLat,
      currentLong,
    ).then(data => {
      calculateRoute(
        {latitude: currentLat, longitude: currentLong},
        doc.pickupLocation,
      );
      setOffers([]);
    });
  };

  const calculateRoute = async (
    pickup: LatLangProps,
    dropoff: LatLangProps,
  ) => {
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${dropoff.latitude},${dropoff.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;
    try {
      const response = await axios.get(directionsUrl);
      const points = decodePolyline(
        response.data.routes[0].overview_polyline.points,
      );
      setRouteCoords(points);
      mapRef.current?.fitToCoordinates([pickup, dropoff], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    } catch (error) {
      console.error('Error fetching directions: ', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentLocation();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!selectedOffer)
      database()
        .ref('/drive-time/rides')
        .on(
          'value',
          snapshot => {
            const allRides = snapshot.val();

            if (allRides) {
              const filteredRides = Object.keys(allRides)
                .map(key => allRides[key])
                .filter(ride => ride.status === 'Offer');
              setOffers(filteredRides);
            } else {
              console.log('No rides found.');
            }
          },
          error => {},
        );
  }, []);

  return (
    <View style={{position: 'relative'}}>
      <MapView
        ref={mapRef}
        showsUserLocation
        userLocationPriority="high"
        showsMyLocationButton
        style={{height: '100%', width: '100%'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        }}
        zoomControlEnabled>
        {selectedOffer?.pickupLocation?.latitude &&
          selectedOffer?.pickupLocation?.longitude && (
            <Marker
              coordinate={{
                latitude: selectedOffer?.pickupLocation?.latitude,
                longitude: selectedOffer?.pickupLocation?.longitude,
              }}
            />
          )}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={6}
            strokeColor="black"
            lineCap={'round'}
            lineJoin={'round'}
          />
        )}
      </MapView>
      {offers &&
        offers?.length > 0 &&
        offers.map((data, index) => {
          return (
            <OfferCard
              key={index}
              data={data}
              handleOfferAccept={() => {
                handleOfferAccept(data);
              }}
            />
          );
        })}
    </View>
  );
};

export default FindRides;
