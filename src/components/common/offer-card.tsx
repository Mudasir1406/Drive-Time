import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, images } from '../../constant'
import { Box, Image } from '@gluestack-ui/themed'
import { useSelector } from 'react-redux'
import { StoreState } from '../../redux/reduxStore'
import Foundation from "react-native-vector-icons/Foundation"
import Entypo from "react-native-vector-icons/Entypo"


const OfferCard = () => {
    const userData = useSelector((state: StoreState) => state.user);
    return (
        <View style={styles.offerMain} >
            <View style={styles.absollute} >
                <View style={styles.top} >
                    <Image source={{
                        uri: userData && userData?.profile ? userData?.profile : images.logo
                    }} style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30
                    }} alt='oops' />
                    <View>

                        <Text style={styles.name} >User Name</Text>
                        <Text style={[styles.name, { fontSize: 14, opacity: 0.8 }]} >Pick up : King Street #01</Text>
                        <Text style={[styles.name, { fontSize: 14, opacity: 0.8 }]} >Destination : King Street #01</Text>
                    </View>
                </View>
                <View style={styles.bottom} >
                    <View style={styles.dollar} >
                        <Foundation name='dollar' style={{ color: colors.white, fontSize: 40 }} />
                        <Text style={[styles.name, { fontSize: 33, fontWeight: "700" }]} >100</Text>
                    </View>
                    <View style={[styles.dollar, { gap: 15 }]} >
                        <Box sx={{ alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "green" }} >

                            <Entypo name='check' style={{ color: "green", fontSize: 30 }} />
                        </Box>
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