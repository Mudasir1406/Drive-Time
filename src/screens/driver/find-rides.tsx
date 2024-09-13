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
import MapView, { Callout, LatLng, Marker } from 'react-native-maps';
import getDistance from 'geolib/es/getPreciseDistance';
import { requestCameraPermission } from '../../utils/camera-permission';
import { colors } from '../../constant';
import { requestLocationPermission } from '../../utils/camera-permission';
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
                { latitude: currentLat, longitude: currentLong },
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


    useEffect(() => {
        getCurrentLocation();
    }, []);
    return (
        <View>
            <MapView
                ref={mapRef}
                showsUserLocation
                userLocationPriority='high'
                showsMyLocationButton
                style={{ height: '100%', width: '100%' }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0421,
                }}
                zoomControlEnabled>
                {/* <Marker coordinate={{ latitude: currentLat, longitude: currentLong }} /> */}

            </MapView>

        </View>
    );
};

export default FindRides;


