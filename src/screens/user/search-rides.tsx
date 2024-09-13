import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SearchRidesScreenNavigationProps} from '../../types/types';
import MapView, {Marker, Polyline, Region} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/login-types/custom-button';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560'; // Replace with your API key

const SearchRides: React.FC<SearchRidesScreenNavigationProps> = () => {
  const [pickupLocation, setPickupLocation] = useState<any>(null);
  const [dropoffLocation, setDropoffLocation] = useState<any>(null);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [distance, setDistance] = useState<string>('');
  const [locationStage, setLocationStage] = useState<
    'pickup' | 'dropoff' | 'none'
  >('pickup');
  const mapRef = useRef<MapView>(null);
  const currentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPickupLocation({latitude, longitude});
        mapRef.current?.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          2000,
        );
        setLocationStage('dropoff');
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPickupLocation({latitude, longitude});
        mapRef.current?.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          2000,
        );
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
    // Request user's location when component mounts
  }, []);

  const calculateRoute = async () => {
    if (pickupLocation && dropoffLocation) {
      const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickupLocation.latitude},${pickupLocation.longitude}&destination=${dropoffLocation.latitude},${dropoffLocation.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const response = await axios.get(directionsUrl);
        const points = decodePolyline(
          response.data.routes[0].overview_polyline.points,
        );
        setRouteCoords(points);

        // Get the distance from the API response
        const routeDistance = response.data.routes[0].legs[0].distance.text;
        setDistance(routeDistance);
        mapRef.current?.fitToCoordinates([pickupLocation, dropoffLocation], {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        });
        setLocationStage('none');
      } catch (error) {
        console.error('Error fetching directions: ', error);
      }
    }
  };

  const decodePolyline = (t: any) => {
    let points = [];
    let index = 0,
      len = t.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  const handleMapPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    if (locationStage === 'pickup') {
      setPickupLocation({latitude, longitude});
      setLocationStage('dropoff');
    } else if (locationStage === 'dropoff') {
      setDropoffLocation({latitude, longitude});
    }
  };
  useEffect(() => {
    if (pickupLocation && !dropoffLocation) {
      mapRef.current?.animateToRegion(
        {
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        2000,
      );
    } else if (pickupLocation && dropoffLocation) {
      mapRef.current?.fitToCoordinates([pickupLocation, dropoffLocation], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  }, [pickupLocation, dropoffLocation]);
  return (
    <View style={styles.container}>
      {/* MapView */}
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        showsUserLocation
        userLocationPriority="high"
        showsMyLocationButton
        initialRegion={{
          latitude: pickupLocation ? pickupLocation.latitude : 37.78825,
          longitude: pickupLocation ? pickupLocation.longitude : -122.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {/* Pickup Marker */}
        {pickupLocation && (
          <Marker coordinate={pickupLocation} title="Pickup Location" />
        )}

        {/* Dropoff Marker */}
        {dropoffLocation && (
          <Marker coordinate={dropoffLocation} title="Dropoff Location" />
        )}

        {/* Polyline showing the route */}
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

      {/* Pickup Location Search */}
      {locationStage === 'pickup' && (
        <GooglePlacesAutocomplete
          placeholder="Pickup Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const {lat, lng}: any = details?.geometry?.location;
            setPickupLocation({
              latitude: lat,
              longitude: lng,
            });
            setLocationStage('dropoff');
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          styles={{
            container: styles.searchContainer,
            textInput: styles.searchInput,
          }}
        />
      )}

      {/* Dropoff Location Search */}
      {locationStage === 'dropoff' && (
        <GooglePlacesAutocomplete
          placeholder="Dropoff Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const {lat, lng}: any = details?.geometry?.location;
            setDropoffLocation({
              latitude: lat,
              longitude: lng,
            });
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          styles={{
            container: [styles.searchContainer, {top: 100}],
            textInput: styles.searchInput,
          }}
        />
      )}

      {/* Confirm Button */}
      {pickupLocation && dropoffLocation && locationStage !== 'none' && (
        <CustomButton
          text="Confirm Locations"
          handlePress={calculateRoute}
          contanierStyles={styles.confirmLocation}
        />
      )}
      {locationStage === 'none' && (
        <CustomButton
          text="Make Offer"
          handlePress={calculateRoute}
          contanierStyles={styles.confirmLocation}
        />
      )}
      {locationStage === 'pickup' && (
        <CustomButton
          text="Current Location"
          handlePress={currentPosition}
          contanierStyles={styles.confirmLocation}
        />
      )}

      {/* Distance Display */}
      <View style={styles.distanceContainer}>
        {distance ? (
          <Text>
            Distance: {distance} Estimated Price: $
            {Number(distance.slice(0, -2)) * 20}
          </Text>
        ) : (
          <Text>Select locations to calculate route</Text>
        )}
      </View>
    </View>
  );
};

export default SearchRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    zIndex: 1,
    top: 20,
    alignSelf: 'center',
  },
  searchInput: {
    borderRadius: 5,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  confirmLocation: {
    bottom: 100,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
  },
});
