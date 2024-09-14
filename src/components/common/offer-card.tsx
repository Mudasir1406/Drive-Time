import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, images } from '../../constant'
import { Box, Image } from '@gluestack-ui/themed'
import Foundation from "react-native-vector-icons/Foundation"
import Entypo from "react-native-vector-icons/Entypo"
import { MyObjectType } from '../../types/types'
import { getLocationName } from '../../utils/location-address'
import { useAuth } from '../../hooks/useAuth'

type Iprops = {
    data: MyObjectType;
    handleOfferAccept: () => void;
}

type CustomerInfo = {
    dob: string;
    firstname: string;
    gender: string;
    lastname: string;
    phone: string;
    userType: string;
    username: string;
    email: string;
    profile: string;
};

const OfferCard: React.FC<Iprops> = ({ data, handleOfferAccept }) => {
    const { getUserById } = useAuth()
    const [pickupAddress, setPickupAddress] = useState('')
    const [dropOffAddress, setDropOffAddress] = useState('')
    const [customerInfo, setcustomerInfo] = useState<CustomerInfo | null>(null);
    useEffect(() => {
        getLocationName(data?.pickupLocation.latitude, data?.pickupLocation.longitude).then((data) => {
            setPickupAddress(data)
        })
        getLocationName(data?.dropoffLocation.latitude, data?.dropoffLocation.longitude).then((data) => {
            setDropOffAddress(data)
        })
        getUserById(data?.uid).then((data) => {
            if (data) {
                setcustomerInfo(data as CustomerInfo)
            }
        })
    }, [data])
    return (
        <View style={styles.offerMain} >
            <View style={styles.absollute} >
                <View style={styles.top} >
                    <Image source={{
                        uri: customerInfo && customerInfo?.profile?.length > 0 ? customerInfo?.profile : images.carPro
                    }} style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30
                    }} alt='oops' />
                    <View style={{ width: "80%" }} >

                        <Text style={styles.name} >{customerInfo && customerInfo?.firstname && customerInfo?.lastname ? `${customerInfo?.firstname} ${customerInfo?.lastname}` : "ANONYMOUS"}</Text>
                        <Text style={[styles.name, { fontSize: 13, opacity: 0.8, flexWrap: "wrap" }]} ><Text style={{ fontSize: 14, fontWeight: "700" }} >Pick up </Text>: {pickupAddress}</Text>
                        <Text style={[styles.name, { fontSize: 13, opacity: 0.8, flexWrap: "wrap" }]} ><Text style={{ fontSize: 14, fontWeight: "700" }} >Destination</Text> : {dropOffAddress}</Text>
                    </View>
                </View>
                <View style={styles.bottom} >
                    <View style={styles.dollar} >
                        <Foundation name='dollar' style={{ color: colors.white, fontSize: 40 }} />
                        <Text style={[styles.name, { fontSize: 33, fontWeight: "700" }]} >{data?.price}</Text>
                    </View>
                    <View style={[styles.dollar, { gap: 15 }]} >
                        <Pressable onPress={handleOfferAccept} style={{ alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "green" }} >

                            <Entypo name='check' style={{ color: "green", fontSize: 30 }} />
                        </Pressable>
                        <Box sx={{ alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "red" }} >
                            <Entypo name='cross' style={{ color: "red", fontSize: 30 }} />
                        </Box>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default OfferCard

const styles = StyleSheet.create({
    offerMain: {
        position: "absolute",
        width: '100%',

        bottom: 110,

        zIndex: 99,
        alignItems: "center",
        justifyContent: "center"
    },
    absollute:
    {
        width: '90%',
        borderRadius: 20,
        elevation: 8,
        backgroundColor: colors.black,
        padding: 22
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    }, name: {
        color: "white",
        fontSize: 20
    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15
    },
    dollar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }
})