import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Text } from '@gluestack-ui/themed'
import { Box } from '@gluestack-ui/themed'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { colors } from '../../constant'

type Iprops = {
    heading: string;
    onPress: () => void;
}

const UploadImage: React.FC<Iprops> = ({ heading, onPress }) => {
    return (
        <>

            <Text sx={styles.subheading} >{heading}</Text>
            <Pressable style={styles.imagePick} onPress={onPress} >
                <MaterialIcons name='add-a-photo' style={{ color: colors.white, fontSize: 30 }} />
                <Text sx={{ color: colors.white, marginTop: 5 }} >Upload Pictures</Text>
            </Pressable>
        </>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    subheading: {
        fontSize: 18,
        textAlign: "left",
        width: "100%",
        marginTop: 10
    },
    imagePick: {
        width: "100%",
        height: 150,
        backgroundColor: colors.grey,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
        borderColor: colors.grey,
        borderWidth: 1
    }
})