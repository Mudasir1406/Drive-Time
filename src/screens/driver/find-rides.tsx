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
import RideComplete from '../../components/common/ride-complete';
import {useUser} from '../../hooks/useUser';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560';
const FindRides = () => {
  const {updateRide} = useUser();

  const [currentLong, setCurrentLong] = useState(0);
  const [currentLat, setCurrentLat] = useState(0);
  const [offers, setOffers] = useState<MyObjectType[]>();
  const [isArrived, setIsArrived] = useState<Boolean>(false);
  const [isRideComplete, setIsRideComplete] = useState<Boolean>(false);
  const mapRef = useRef<MapView | null>(null);
  const userData = useSelector((state: StoreState) => state.user);

  const [selectedOffer, setselectedOffer] = useState<MyObjectType | null>();
  const [mySelectedOffer, setMySelectedOffer] = useState<MyObjectType | null>(
    null,
  );
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const handleSubmitOk = () => {
    if (selectedOffer) {
      updateRide({...selectedOffer, driverInfo: userData});

      database()
        .ref(`/drive-time/rides/${selectedOffer.uid}`)
        .remove()
        .then(() => {
          console.log('Ride successfully removed from database.');
        })
        .catch(error => {
          console.error('Error removing ride:', error);
        });

      // Reset state
      setselectedOffer(null);
      setIsRideComplete(false);
    }
  };
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

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        // Update current latitude and longitude state
        setCurrentLat(latitude);
        setCurrentLong(longitude);

        console.log(selectedOffer, 'selectedOffer');
        if (selectedOffer) {
          // Calculate driver's distance from last known location
          const driverLat = selectedOffer?.driverInfo?.currentLat || 0;
          const driverLong = selectedOffer?.driverInfo?.currentLong || 0;
          console.log(
            calculateDistance(driverLat, driverLong, latitude, longitude),
            'distt',
          );
          if (
            calculateDistance(driverLat, driverLong, latitude, longitude) > 5
          ) {
            const resp = await updateDriverLocation(
              selectedOffer.uid,
              latitude,
              longitude,
            );
            console.log(resp.data, 'daa');
            setselectedOffer({
              ...selectedOffer,
              driverInfo: resp.data.driverInfo,
            });
          }

          // Check the distance to the pickup location
          const pickUpDistance = calculateDistance(
            latitude,
            longitude,
            selectedOffer?.pickupLocation?.latitude,
            selectedOffer?.pickupLocation?.longitude,
          );

          if (pickUpDistance <= 50) {
            // Mark as Driver Arrived at pickup
            updateAndPushData(
              selectedOffer.uid,
              'Driver_Arrived',
              selectedOffer,
              userData,
              latitude,
              longitude,
            );
            console.log('Driver has arrived at the pickup location');
            setIsArrived(true);

            // Calculate route for pickup and dropoff locations
            calculateRoute(
              selectedOffer.pickupLocation,
              selectedOffer.dropoffLocation,
            );
          }

          // Check the distance to the dropoff location
          const dropOffDistance = calculateDistance(
            latitude,
            longitude,
            selectedOffer?.dropoffLocation?.latitude,
            selectedOffer?.dropoffLocation?.longitude,
          );

          if (dropOffDistance <= 50) {
            // Mark ride as completed
            updateAndPushData(
              selectedOffer.uid,
              'Ride_Completed',
              selectedOffer,
              userData,
              latitude,
              longitude,
            );
            setIsRideComplete(true);
            console.log('Ride Completed');
          }
        }

        // Update map view with the new location
        mapRef.current?.animateToRegion(
          {
            latitude,
            longitude,
            longitudeDelta: 0.05,
            latitudeDelta: 0.05,
          },
          500, // Duration for animation in milliseconds
        );

        // Store the current position as the previous one for future comparison
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 20000,
      },
    );
  };

  const handleOfferAccept = (doc: MyObjectType) => {
    updateAndPushData(
      doc?.uid,
      'Offer_accepted',
      doc,
      userData,
      currentLat,
      currentLong,
    ).then(resp => {
      console.log(resp.data, 'daata');
      setselectedOffer(resp.data);
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
        response?.data.routes[0]?.overview_polyline.points,
      );
      setRouteCoords(points);
      mapRef?.current?.fitToCoordinates([pickup, dropoff], {
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
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (selectedOffer) {
      getCurrentLocation();
    }
  }, [selectedOffer]);
  useEffect(() => {
    // Fetch ride data from the database
    if (!selectedOffer) {
      database()
        .ref('/drive-time/rides')
        .on(
          'value',
          snapshot => {
            const allRides = snapshot.val();

            if (allRides) {
              // Get the user's current location using Geolocation
              Geolocation.getCurrentPosition(
                position => {
                  const {latitude, longitude} = position.coords;

                  // Filter rides based on the user's current location
                  const filteredRides = Object.keys(allRides)
                    .map(key => allRides[key])
                    .filter(ride => {
                      const distanceInMeters = calculateDistance(
                        latitude, // Use current latitude
                        longitude, // Use current longitude
                        ride.pickupLocation.latitude,
                        ride.pickupLocation.longitude,
                      );

                      const distanceInKm = distanceInMeters / 1000;

                      return ride.status === 'Offer' && distanceInKm <= 2;
                    });

                  // Update the offers state with the filtered rides
                  if (filteredRides.length > 0) setOffers(filteredRides);
                  console.log(filteredRides, 'filteredRides');
                },
                error => {
                  console.error('Error getting current position:', error);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 30000,
                  maximumAge: 20000,
                },
              );
            } else {
              console.log('No rides found.');
            }
          },
          error => {
            console.error('Error fetching rides:', error);
          },
        );
    }
  }, []);
  useEffect(() => {
    if (selectedOffer) {
      const rideRef = database().ref(`/drive-time/rides/${selectedOffer.uid}`);

      const handleDataChange = (snapshot: {val: () => any}) => {
        const rideData = snapshot.val();

        if (rideData) {
          // Directly check the status of this single ride document
          if (rideData.status === 'Driver_Arrived') {
            setCurrentLat(rideData.pickupLocation.latitude);
            setCurrentLong(rideData.pickupLocation.longitude);
            setIsArrived(true);
            calculateRoute(
              selectedOffer?.pickupLocation,
              selectedOffer?.dropoffLocation,
            );
            console.log('Driver has arrived at the pickup location');
          }

          if (rideData.status === 'Ride_Completed') {
            setIsRideComplete(true);
            console.log('Ride Completed');
          }
        } else {
          console.log('Ride not found.');
        }
      };

      rideRef.on('value', handleDataChange, error => {
        console.log(error);
      });
      return () => {
        rideRef.off('value', handleDataChange);
      };
    }
  }, [selectedOffer]);

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
            <>
              <Marker
                coordinate={{
                  latitude: currentLat,

                  longitude: currentLong,
                }}
              />
              <Marker
                coordinate={{
                  latitude: isArrived
                    ? selectedOffer?.dropoffLocation?.latitude
                    : selectedOffer?.pickupLocation?.latitude,
                  longitude: isArrived
                    ? selectedOffer?.dropoffLocation?.longitude
                    : selectedOffer?.pickupLocation?.longitude,
                }}
              />
            </>
          )}
        {routeCoords?.length > 0 && (
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
        offers?.map((data, index) => {
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
      {isRideComplete && (
        <RideComplete
          fare={selectedOffer?.price}
          handleSubmitOk={handleSubmitOk}
        />
      )}
    </View>
  );
};

export default FindRides;
