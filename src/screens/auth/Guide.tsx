import { Animated, Dimensions, Easing, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed'
import { GuideContent } from '../../components'
import { colors } from '../../constant'
import { guideScreenNavigationProps } from '../../types/types'
import { contentApp } from '../../constant'


type props = {
    navigation: guideScreenNavigationProps
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const Guide: React.FC<props> = ({ navigation }) => {
    const [guideScreen, setGuideScreen] = useState('first');
    const [content, setContent] = useState(contentApp.contents);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const slideIn = () => {
        // Slide animation
        slideAnim.setValue(SCREEN_WIDTH); // Start from off-screen
        Animated.timing(slideAnim, {
            toValue: 0, // Slide in to the center of the screen
            duration: 300, // Animation duration in ms
            easing: Easing.ease, // Easing function
            useNativeDriver: true // Use native driver for performance
        }).start();
    }
    const handleNavigate = (name: string) => {
        if (name === 'skip' || name === 'done') {
            navigation.navigate('LoginType')
        }

    }
    const handleNext = () => {
        if (guideScreen === 'first') {
            setGuideScreen('second')
        } else if (guideScreen === 'second') {
            setGuideScreen('third')
        }
    }
    useEffect(() => {

        if (guideScreen === 'first') {
            setContent(contentApp.contents)
        }
        if (guideScreen === 'second') {
            setContent(contentApp.contentSecond)
        }
        if (guideScreen === 'third') {
            setContent(contentApp.contentThird)
        }

    }, [guideScreen])
    useEffect(() => {
        // Slide in content when guideScreen changes
        slideIn();
    }, [guideScreen]);
    return (
        <Box sx={styles.main} >
            <Animated.View style={[styles.contentContainer, { transform: [{ translateX: slideAnim }] }]}>

                <GuideContent heading={content.heading} tagLine={content.tagLine} />
            </Animated.View>
            <Box sx={styles.btnBox} >
                <Button
                    size="md"
                    variant="solid"
                    isDisabled={false}
                    isFocusVisible={true}
                    sx={styles.btn}
                    onPress={() => { guideScreen !== 'third' ? handleNavigate('skip') : setGuideScreen('second') }}
                >
                    <ButtonText sx={styles.btnText} >{guideScreen !== 'third' ? 'SKIP' : "BACK"} </ButtonText>
                </Button>
                <Button
                    size="md"
                    variant="solid"
                    isDisabled={false}
                    isFocusVisible={false}
                    sx={styles.btn}
                    onPress={() => { guideScreen !== 'third' ? handleNext() : handleNavigate('done') }}
                >
                    <ButtonText sx={styles.btnText}> {guideScreen !== 'third' ? 'NEXT' : "Done"}</ButtonText>
                </Button>
            </Box>


        </Box>
    )
}

export default Guide

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
    },
    btnBox: {
        position: "absolute",
        bottom: 30,
        width: "90%",
        justifyContent: "space-between",
        marginHorizontal: 20,
        flexDirection: "row"
    },
    btn: {
        backgroundColor: colors.transparent, borderColor: colors.black, borderWidth: 1, borderRadius: 20
    },
    btnText: {
        color: colors.black
    }
})