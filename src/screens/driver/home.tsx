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
import Geolocation from 'react-native-geolocation-service';
import getDistance from 'geolib/es/getPreciseDistance';
import { requestCameraPermission } from '../../utils/camera-permission';
import { colors } from '../../constant';

type MyObjectType = {
    latitude: number;
    longitude: number;
    title: string;
    distance: number;
    photoURL: string;
}

const Home = () => {
    const [currentLong, setCurrentLong] = useState(0);
    const [currentLat, setCurrentLat] = useState(0);
    const [NearbyHospitals, setNearbyHospitals] = useState<any[]>([]);
    const [markers, setMarkers] = useState<MyObjectType[]>([]);
    const mapRef = useRef<MapView | null>(null);
    const placeType = 'hospital';
    const googleAPIKey = 'AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560';
    const getCurrentLocation = async () => {
        const isLocation = await requestCameraPermission();
        console.log(isLocation);
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
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                forceRequestLocation: true,
                forceLocationManager: true,
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
    const fetchData = async () => {
        const url =
            'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
            currentLat +
            ',' +
            currentLong +
            '&radius=5000' +
            '&type=' +
            placeType +
            '&key=' +
            googleAPIKey;
        try {
            const data = await fetch(url);
            const resp = await data.json();

            if (resp && resp.results) {
                const coords: LatLng[] = [];
                let temp = [];
                for (let item = 0; item < resp.results.length; item++) {
                    coords.push({
                        latitude: resp.results[item].geometry.location.lat,
                        longitude: resp.results[item].geometry.location.lng,
                    });
                    const distance = calculateDistance({
                        latitude: resp.results[item].geometry.location.lat,
                        longitude: resp.results[item].geometry.location.lng,
                    });

                    let obj = {
                        latitude: resp.results[item].geometry.location.lat,
                        longitude: resp.results[item].geometry.location.lng,
                        title: resp.results[item].name,
                        distance: distance,
                        photoURL: resp.results[item].icon,
                    };
                    temp.push(obj);
                }
                setMarkers(temp);
                setNearbyHospitals(resp.results);
                if (coords.length) {
                    mapRef.current?.fitToCoordinates(coords, {
                        edgePadding: {
                            top: 50,
                            bottom: 50,
                            left: 50,
                            right: 50,
                        },
                        animated: true,
                    });
                }
            }
        } catch (e) {
            console.log(e, 'error');
        }
    };
    const openGoogleMaps = (lat: number, lng: number, label?: string) => {
        // Construct the URL
        const url = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;

        // Open the URL
        Linking.openURL(url);
    };

    useEffect(() => {
        fetchData();
    }, [currentLong, currentLat]);
    useEffect(() => {
        getCurrentLocation();
    }, []);
    return (
        <View>
            <MapView
                ref={mapRef}
                style={{ height: '100%', width: '100%' }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0421,
                }}
                zoomControlEnabled>
                <Marker coordinate={{ latitude: currentLat, longitude: currentLong }} />
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
                                        <Text style={{ fontWeight: '600' }}>{item.title}</Text>
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
            <TouchableOpacity
                style={styles.curentLocationBtn}
                onPress={() => getCurrentLocation()}>
                <Text style={{ color: colors.white }}>
                    Get Current Location
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

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
        elevation: 3
    },
});