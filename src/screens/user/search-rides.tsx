import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SearchRidesScreenNavigationProps} from '../../types/types';
import MapView, {Marker, Polyline, Region} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomButton from '../../components/login-types/custom-button';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import {Timestamp} from '@react-native-firebase/firestore';
import {getRides} from '../../services/firebase-realtime/rides-services';
import {decodePolyline} from '../../utils/map-functions';
import DriverFound from '../../components/common/driver-found';
import {UserSliceType} from '../../redux/user/slice';
import PaymentModal from '../../components/common/payment-modal';
import {
  StripeProvider,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import DriverArrived from '../../components/common/driver-arrived';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560'; // Replace with your API key
export type LatLangProps = {
  latitude: number;
  longitude: number;
};

const SearchRides: React.FC<SearchRidesScreenNavigationProps> = ({
  navigation,
}) => {
  const [pickupLocation, setPickupLocation] = useState<LatLangProps | null>(
    null,
  );
  const [dropoffLocation, setDropoffLocation] = useState<LatLangProps | null>(
    null,
  );
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [distance, setDistance] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [driverLocation, setDriverLocation] = useState<LatLangProps | null>(
    null,
  );
  const [driverInfo, setDriverInfo] = useState<UserSliceType>();
  const [finding, setFinding] = useState<boolean>(false);
  const [isArrived, setIsArrived] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [showDriverInfo, setShowDriverInfo] = useState<boolean>(false);
  const {confirmPayment} = useConfirmPayment();
  const [clientSecret, setClientSecret] = useState('');
  const [locationStage, setLocationStage] = useState<
    'pickup' | 'dropoff' | 'none'
  >('pickup');
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const initializePaymentSheet = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Your Merchant Name',
      style: 'automatic', // Can be 'automatic' or 'manual'
      allowsDelayedPaymentMethods: true, // For future off-session payments
    });

    if (!error) {
      setLoading(true); // Enable the payment button
    }
  };
  const userData = useSelector((state: StoreState) => state.user);
  const mapRef = useRef<MapView>(null);
  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(
      'https://grandviewgetaway.com:3000/drive-time/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount, // Amount in the smallest currency unit (e.g., cents for USD)
          currency: 'usd', // The currency code
        }),
      },
    );
    const {clientSecret} = await response.data;
    return clientSecret;
  };
  const openPaymentSheet = async () => {
    Alert.alert('Success', 'Your payment was confirmed successfully!', [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('BottomTab', {screen: 'Home'}),
      },
    ]);
    // await initializePaymentSheet();
    // const {error} = await presentPaymentSheet();

    // if (error) {
    //   Alert.alert(`Error: ${error.message}`);
    // } else {
    //   Alert.alert('Success', 'Your payment was confirmed successfully!', [
    //     {
    //       text: 'Ok',
    //       onPress: () => navigation.navigate('BottomTab', {screen: 'Home'}),
    //     },
    //   ]);
    // }
  };
  useEffect(() => {}, []);
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
        // setPickupLocation({ latitude, longitude });
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

  const calculateRoute = async (
    pickup: LatLangProps,
    dropoff: LatLangProps,
  ) => {
    if (pickup && dropoff) {
      const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${dropoff.latitude},${dropoff.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;

      try {
        const response = await axios.get(directionsUrl);
        const points = decodePolyline(
          response.data?.routes[0]?.overview_polyline?.points,
        );
        setRouteCoords(points);

        // Get the distance from the API response
        const routeDistance = response.data.routes[0].legs[0].distance.text;
        setDistance(routeDistance);
        mapRef.current?.fitToCoordinates([pickup, dropoff], {
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

  const handleMapPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    if (locationStage === 'pickup') {
      setPickupLocation({latitude, longitude});
      setLocationStage('dropoff');
    } else if (locationStage === 'dropoff') {
      setDropoffLocation({latitude, longitude});
    }
  };
  const findRides = () => {
    setFinding(true);
    database()
      .ref('/drive-time/rides/' + userData.uid)
      .set({
        pickupLocation,
        dropoffLocation,
        distance,
        dateTime: Timestamp.now(),
        price: Number(distance.slice(0, -2)) * 20,
        status: 'Offer',
        uid: userData.uid,
      })
      .then(() => console.log('Data set.'));
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

  useEffect(() => {
    if (userData?.uid) {
      database()
        .ref('/drive-time/rides/' + userData.uid)
        .on('value', snapshot => {
          if (snapshot?.val()?.uid) {
            setDropoffLocation(snapshot.val().dropoffLocation);
            setPickupLocation(snapshot.val().pickupLocation);

            if (
              snapshot.val().dropoffLocation &&
              snapshot.val().pickupLocation
            ) {
              setLocationStage('none');
            }
            calculateRoute(
              snapshot.val().pickupLocation,
              snapshot.val().dropoffLocation,
            );

            if (snapshot.val().status === 'Driver_Arrived') {
              setIsArrived(true);
            }
            if (snapshot.val()?.driverInfo) {
              if (snapshot.val().status === 'Offer_accepted') {
                setShowDriverInfo(true);
                mapRef.current?.fitToCoordinates(
                  [
                    snapshot.val().pickupLocation,
                    {
                      latitude: snapshot.val().driverInfo.currentLat,
                      longitude: snapshot.val().driverInfo.currentLong,
                    },
                  ],
                  {
                    edgePadding: {
                      top: 50,
                      right: 50,
                      bottom: 50,
                      left: 50,
                    },
                    animated: true,
                  },
                );
              }
              setDriverInfo(snapshot.val()?.driverInfo);
              console.log(snapshot.val()?.driverInfo);
              setDriverLocation({
                latitude: snapshot.val()?.driverInfo?.currentLat,
                longitude: snapshot.val()?.driverInfo?.currentLong,
              });
            }
            if (snapshot.val().status === 'Ride_Completed') {
              setAmount(snapshot.val().price);
              setShowPayment(true);
            }
          }
        });
    }
  }, []);
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
        {driverLocation && (
          <Marker coordinate={driverLocation} title="Driver Location" />
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
            container: [styles.searchContainer],
            textInput: styles.searchInput,
          }}
        />
      )}

      {/* Confirm Button */}
      {pickupLocation && dropoffLocation && locationStage !== 'none' && (
        <CustomButton
          text="Confirm Locations"
          handlePress={() => calculateRoute(pickupLocation, dropoffLocation)}
          contanierStyles={styles.confirmLocation}
        />
      )}
      {locationStage === 'none' && !finding && (
        <CustomButton
          text="Find Ride"
          handlePress={findRides}
          contanierStyles={styles.confirmLocation}
        />
      )}
      {finding && (
        <CustomButton
          text={driverInfo ? "Driver is on it's way." : 'Finding Ride...'}
          handlePress={() => {}}
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
      {driverInfo && showDriverInfo && (
        <DriverFound
          driverInfo={driverInfo}
          onPressOk={() => setShowDriverInfo(false)}
        />
      )}
      {isArrived && <DriverArrived onPressOk={() => setIsArrived(false)} />}
      <StripeProvider publishableKey="pk_test_51P2FrVRxtMIfYHGVrveT5sJAln9upSl8ghZN4LYmZztIqVsYJeH0iYoGm3V6A9ayNUDfsfAmjK2TAM0OZa1s1g5200mfSyW94V">
        {showPayment ? (
          <PaymentModal onPressOk={openPaymentSheet} amount={amount} />
        ) : (
          <></>
        )}
      </StripeProvider>
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
