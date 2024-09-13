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
import MapView, {Callout, LatLng, Marker} from 'react-native-maps';
import getDistance from 'geolib/es/getPreciseDistance';
import {requestCameraPermission} from '../../utils/camera-permission';
import {colors} from '../../constant';
import {requestLocationPermission} from '../../utils/camera-permission';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import OfferCard from '../../components/common/offer-card';
import Geolocation from '@react-native-community/geolocation';

type MyObjectType = {
  latitude: number;
  longitude: number;
  title: string;
  distance: number;
  photoURL: string;
};

const FindRides = () => {
  const [currentLong, setCurrentLong] = useState(0);
  const [currentLat, setCurrentLat] = useState(0);
  const [NearbyHospitals, setNearbyHospitals] = useState<any[]>([]);
  const [markers, setMarkers] = useState<MyObjectType[]>([]);
  const mapRef = useRef<MapView | null>(null);
  const placeType = 'hospital';
  const googleAPIKey = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560';
  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLong(position.coords.longitude);
        setCurrentLat(position.coords.latitude);
        mapRef.current?.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            longitudeDelta: 0.05,
            latitudeDelta: 0.05,
          },
          500,
        );
      },
      error => {
        console.log(error, error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const calculateDistance = (destination: LatLng): number => {
    if (currentLat && currentLong) {
      return getDistance(
        {latitude: currentLat, longitude: currentLong},
        {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      );
    }
    return 0;
  };

  const openGoogleMaps = (lat: number, lng: number, label?: string) => {
    // Construct the URL
    const url = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;

    // Open the URL
    Linking.openURL(url);
  };
  const readUserData = () => {
    database()
      .ref('/drive-time')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
      });
  };

  useEffect(() => {
    getCurrentLocation();
    readUserData();
  }, []);
  return (
    <View style={{position: 'relative'}}>
      <OfferCard />
      <MapView
        ref={mapRef}
        style={{height: '100%', width: '100%'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        }}
        zoomControlEnabled>
        <Marker coordinate={{latitude: currentLat, longitude: currentLong}} />
        {markers.length > 0 &&
          markers.map((item, i) => {
            let coord: LatLng = {
              latitude: item.latitude,
              longitude: item.longitude,
            };
            return (
              <Marker key={i} coordinate={coord}>
                <Callout
                  onPress={() =>
                    openGoogleMaps(coord.latitude, coord.longitude, item.title)
                  }>
                  <View>
                    <Text style={{fontWeight: '600'}}>{item.title}</Text>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}>{`Distance: ${item?.distance?.toFixed(
                      2,
                    )} meters`}</Text>
                    <Text
                      style={{
                        fontWeight: '600',
                        textAlign: 'center',
                        marginTop: 1,
                      }}>
                      Click to get direction
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
      </MapView>
      {/* <TouchableOpacity
                style={styles.curentLocationBtn}
                onPress={() => getCurrentLocation()}>
                <Text style={{ color: colors.white }}>Get Current Location</Text>
            </TouchableOpacity> */}
    </View>
  );
};

export default FindRides;

const styles = StyleSheet.create({
  curentLocationBtn: {
    position: 'absolute',
    bottom: 120,
    backgroundColor: colors.grey,
    borderRadius: 20,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
  },
});
