import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Image, Text } from '@gluestack-ui/themed'
import { images, colors } from '../../constant'

type Tprops = {
    heading: string;
    tagLine: string;
}

const GuideContent: React.FC<Tprops> = ({ heading, tagLine }) => {
    return (
        <Box>
            <Image
                source={{ uri: images.guide1 }} // Image from URI
                style={styles.image}
                alt='oops'
            />
            <Text sx={styles.heading} >{heading}</Text>
            <Text sx={styles.tagLine} >{tagLine}</Text>

        </Box>
    )
}

export default GuideContent

const styles = StyleSheet.create({
    image: {
        width: 350,
        height: 350
    },
    heading: {
        textAlign: "center",
        fontSize: 30,
        color: colors.black
    },
    tagLine: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 10
    }
})