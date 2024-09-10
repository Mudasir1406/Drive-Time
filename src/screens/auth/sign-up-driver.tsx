import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, ScrollView } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { colors } from '../../constant'
import UploadImage from '../../components/signup-driver/UploadImage'
import { requestCameraPermission } from '../../Utils/CameraPermission'
import ImagePicker from 'react-native-image-crop-picker';
import { Toast } from 'react-native-toast-notifications'
import { firebase } from '@react-native-firebase/auth'
import { uploadImage } from '../../services/storage-service/StorageService'

const SignUpDriver = () => {
    const [vehicleImages, setvehicleImages] = useState([]);
    const [vehicleDocuments, setvehicleDocuments] = useState([]);
    const [license, setLisence] = useState([]);
    const [cnic, setCnic] = useState([]);

    const openCamera = async () => {
        let pic: string | undefined = '';
        const test = await requestCameraPermission();
        console.log(test);

        if (test) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {

                console.log(image);
                uploadImage(image.path).then((url) => {
                    console.log(url);
                    pic = url;
                    Toast.show('Picture Updated', {
                        type: 'success',
                    });
                })
            });

        }
        return pic;
    };
    const openGallery = () => {
        let pic: string | undefined = '';
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            uploadImage(image.path).then((url) => {
                console.log(url);
                pic = url;
                Toast.show('Picture Updated', {
                    type: 'success',
                });

            })
        });
        return pic;
    };

    const handleImageUpload = (type: string) => {
        let url = openCamera();
        if (type === 'vehiclePicture') {
            setvehicleImages((prev) => (
                {
                    ...prev,
                    url
                }
            ))
        } else if (type === 'vehicleDocuments') {
            setvehicleDocuments((prev) => (
                {
                    ...prev,
                    url
                }
            ))
        } else if (type === 'lisence') {
            setLisence((prev) => (
                {
                    ...prev,
                    url
                }
            ))
        } else if (type === 'cnic') {
            setCnic((prev) => (
                {
                    ...prev,
                    url
                }
            ))
        }
    }
    return (
        <ScrollView>
            <Box sx={styles.form} >
                <Text sx={styles.heading} >Driver's Information</Text>
                <UploadImage heading='Upload Vehicle Pictures' onPress={() => { handleImageUpload('vehiclePicture') }} />
                <UploadImage heading='Upload Vehicle Documents' onPress={() => { handleImageUpload('vehicleDocuments') }} />
                <UploadImage heading='Upload License (front/back)' onPress={() => { handleImageUpload('lisence') }} />
                <UploadImage heading='Upload CNIC (front/back)' onPress={() => { handleImageUpload('cnic') }} />
            </Box>
        </ScrollView>
    )
}

export default SignUpDriver

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: "center",
        padding: 20
    },
    heading: {
        color: colors.black,
        fontSize: 25,
        textAlign: "left",
        width: "100%",
        fontWeight: "600"

    },

})