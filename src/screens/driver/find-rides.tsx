import {
    Button,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, LatLng, Marker, Polyline } from 'react-native-maps';
import getDistance from 'geolib/es/getPreciseDistance';
import { requestCameraPermission } from '../../utils/camera-permission';
import { colors } from '../../constant';
import { requestLocationPermission } from '../../utils/camera-permission';
import Geolocation from '@react-native-community/geolocation';
import {
    getRides,
    updateAndPushData,
    updateDriverLocation,
} from '../../services/firebase-realtime/rides-services';
import { Timestamp } from '@react-native-firebase/firestore';
import OfferCard from '../../components/common/offer-card';
import { MyObjectType } from '../../types/types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import axios from 'axios';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560';
const FindRides = () => {
    const [currentLong, setCurrentLong] = useState(0);
    const [currentLat, setCurrentLat] = useState(0);
    const [offers, setOffers] = useState<MyObjectType[]>();
    const mapRef = useRef<MapView | null>(null);
    const userData = useSelector((state: StoreState) => state.user);
    const prevPositionRef = useRef<{ latitude: number; longitude: number } | null>(
        null,
    );
    const [selectedOffer, setselectedOffer] = useState<MyObjectType>();
    const [routeCoords, setRouteCoords] = useState<any[]>([]);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                // Update state
                setCurrentLat(latitude);
                setCurrentLong(longitude);

                // Check if the position has changed
                if (
                    selectedOffer &&
                    prevPositionRef.current &&
                    (prevPositionRef.current.latitude !== latitude ||
                        prevPositionRef.current.longitude !== longitude)
                ) {
                    updateDriverLocation(selectedOffer?.uid, latitude, longitude);
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
                prevPositionRef.current = { latitude, longitude };
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
    const getFIlterRides = () => {
        getRides().then(data => {
            console.log(data, '(data?.filteredRides');

            setOffers(data?.filteredRides);
        });
    }
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
            console.log(data, 'update data');
            calculateRoute();
            getFIlterRides()
        });
    };

    const calculateRoute = async () => {
        console.log(selectedOffer, 'selectedOffer');

        if (selectedOffer) {
            const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLat},${currentLong}&destination=${selectedOffer?.pickupLocation?.latitude},${selectedOffer?.pickupLocation?.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;
            try {
                const response = await axios.get(directionsUrl);
                const points = decodePolyline(
                    response.data.routes[0].overview_polyline.points,
                );
                setRouteCoords(points);
                mapRef.current?.fitToCoordinates(
                    [
                        selectedOffer.pickupLocation,
                        { latitude: currentLat, longitude: currentLong },
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            getCurrentLocation();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        getFIlterRides()
    }, []);
    useEffect(() => {
        console.log(offers, 'offers');

    }, [offers]);


    return (
        <View style={{ position: 'relative' }}>
            <MapView
                ref={mapRef}
                showsUserLocation
                userLocationPriority="high"
                showsMyLocationButton
                style={{ height: '100%', width: '100%' }}
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
            {
                offers &&
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
