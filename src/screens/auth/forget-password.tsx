import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { colors, images } from '../../constant'
import { Image } from '@gluestack-ui/themed'
import CustomInput from '../../components/common-cpmponents/Input-field'
import { TextInput } from 'react-native'
import CustomButton from '../../components/login-types/custom-button'
import { firebase } from '@react-native-firebase/auth'
import { Toast } from 'react-native-toast-notifications'
import { loginScreenNavigationProps } from '../../types/types'

type Iprops = {
    navigation: loginScreenNavigationProps
}

const ForgetPassword: React.FC<Iprops> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const handleChange = (text: string) => {
        setEmail(text);
    }
    const handleResetPassword = () => {
        if (email.length > 0) {
            // Show a loading toast while the reset email is being sent
            const loadingToast = Toast.show('Sending reset email...', {
                type: 'normal',
                placement: 'top',
                duration: 3000,
                animationType: 'slide-in',
            });

            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    // Hide the loading toast and show success
                    Toast.hide(loadingToast);
                    navigation.navigate('Login');
                    Toast.show('Password reset email sent!', {
                        type: 'success',
                        placement: 'top',
                        duration: 4000,
                        animationType: 'slide-in',
                    });
                })
                .catch((error) => {
                    // Hide the loading toast and show error message
                    Toast.hide(loadingToast);
                    Toast.show(`Error: ${error.message}`, {
                        type: 'danger',
                        placement: 'top',
                        duration: 4000,
                        animationType: 'slide-in',
                    });
                });
        } else {
            // Show a toast if the email field is empty
            Toast.show('Please enter your email address', {
                type: 'warning',
                placement: 'top',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    }

    return (
        <Box sx={styles.main} >
            <Image
                source={{ uri: images.logo }} // Image from URI
                style={styles.image}
                alt="oops"
            />
            <Text sx={styles.textStyle}>Forget Password</Text>
            <TextInput
                style={
                    styles.input
                }
                onChangeText={handleChange}
                value={email}
                placeholder='Enter Email..'
            />
            <Box sx={styles.btnBox} >

                <CustomButton
                    text={'RESET YOUR EMAIL'}
                    handlePress={handleResetPassword}
                />
            </Box>
        </Box>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 700,
        color: colors.black,
    },
    image: {
        height: 250,
        width: 250,
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: "90%"
    },
    btnBox: {
        width: "90%",
        marginTop: 15
    }
})