import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { colors, images } from '../../constant'
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { Box } from '@gluestack-ui/themed';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Image } from '@gluestack-ui/themed';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"

interface HelpBoxProps {
    text: string;
    icon: ReactNode;
}

const HelpBox: React.FC<HelpBoxProps> = ({ text, icon }) => {
    return (
        <Box sx={styles.singleBox} >
            {icon}
            <Text style={{ color: colors.white, fontSize: 18 }} >{text}</Text>
        </Box>
    )
}

const Profile: React.FC = () => {
    const userData = useSelector((state: StoreState) => state.user);
    const boxContent = {
        help: {
            text: "Help",
            icon: <FontAwesome5 name='hands-helping' style={{ color: colors.white, fontSize: 20 }} />
        },
        wallet: {
            text: "Wallet",
            icon: <FontAwesome5 name='wallet' style={{ color: colors.white, fontSize: 20 }} />
        },
    }
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
                <HelpBox text={boxContent.help.text} icon={boxContent.help.icon} />
                <HelpBox text={boxContent.wallet.text} icon={boxContent.wallet.icon} />
            </View>
            <View style={[styles.squareBox, { flexDirection: "column", padding: 30 }]} >
                <Box style={styles.infoPages} >
                    <AntDesign name='profile' style={{ color: colors.black, fontSize: 25 }} />
                    <Text style={{ color: colors.black, fontSize: 20, fontWeight: "600" }} >Edit Profile</Text>
                </Box>
                <Box style={styles.infoPages} >
                    <FontAwesome5 name='info-circle' style={{ color: colors.black, fontSize: 25 }} />
                    <Text style={{ color: colors.black, fontSize: 20, fontWeight: "600" }} >About Us</Text>
                </Box>
                <Box style={styles.infoPages} >
                    <MaterialIcons name='logout' style={{ color: colors.black, fontSize: 25 }} />
                    <Text style={{ color: colors.black, fontSize: 19, fontWeight: "600" }} >Logout</Text>
                </Box>
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
        marginTop: 20,
        alignItems: "center", width: "100%", flexDirection: "row", justifyContent: "center", gap: 15
    },
    singleBox: {
        width: '40%',
        height: 125,
        borderRadius: 10,
        backgroundColor: colors.black,
        elevation: 8,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    infoPages: {
        flexDirection: "row",
        gap: 20,
        marginVertical: 5,
        width: "100%"
    }
})