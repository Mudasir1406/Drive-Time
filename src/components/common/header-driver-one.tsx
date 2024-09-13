import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from '@gluestack-ui/themed'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootBottomTabParamsDriver } from '../../types/types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { colors, images } from '../../constant';
import Fontisto from "react-native-vector-icons/Fontisto"

type Iprops = {
    title: string;
}

const HeaderDriverOne: React.FC<Iprops> = ({ title }) => {
    const navigation = useNavigation<NavigationProp<RootBottomTabParamsDriver>>();
    const userData = useSelector((state: StoreState) => state.user);
    return (
        <View style={{ padding: 10, width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }} >
            <Pressable onPress={() => { navigation.navigate('Profile') }} >

                <Image source={{
                    uri: userData && userData?.profile ? userData?.profile : images.logo
                }} style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20
                }} alt='oops' />
            </Pressable>
            <Text style={styles.title} >{title}</Text>
            <Fontisto name='bell-alt' style={{ color: colors.grey, fontSize: 35, elevation: 3 }} />
        </View>
    )
}

export default HeaderDriverOne

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "600",

    }
})