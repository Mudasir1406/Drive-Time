import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, images } from '../../constant'
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { Box } from '@gluestack-ui/themed';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Image } from '@gluestack-ui/themed';

const HelpBox = () => {
    return (
        <Box sx={styles.singleBox} ></Box>
    )
}

const Profile: React.FC = () => {
    const userData = useSelector((state: StoreState) => state.user);
    return (
        <View style={{ flex: 1 }} >

            <View style={{ alignItems: "center", width: "100%", padding: 25, flexDirection: "row", justifyContent: "space-between" }} >
                <Box>
                    <Text style={{ fontSize: 25, fontWeight: "700" }} >Profile</Text>
                    <Text style={{ fontSize: 30, color: colors.black, fontWeight: "700" }} >Welcome, {userData?.lastname}</Text>
                </Box>
                <Box sx={styles.ImageBox} >
                    <Image source={{
                        uri: userData && userData?.profile ? userData?.profile : images.logo
                    }} style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,

                    }} alt='oops' />
                    <Box sx={styles.editIcon} >
                        <MaterialCommunityIcons name='square-edit-outline' style={{ color: colors.white, fontSize: 20 }} />
                    </Box>
                </Box>
            </View>

            <View style={styles.squareBox} >
                <HelpBox />
                <HelpBox />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    ImageBox: {
        position: "relative",
    },
    editIcon: {
        position: "absolute",
        left: -10,
        bottom: -10,
        zIndex: 999,
        backgroundColor: colors.black,
        width: 40,
        height: 40,
        borderRadius: 20,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    squareBox: {
        alignItems: "center", width: "100%", flexDirection: "row", justifyContent: "center", gap: 15
    },
    singleBox: {
        width: '40%',
        height: 125,
        borderRadius: 10,
        backgroundColor: colors.black,
        elevation: 4
    }
})