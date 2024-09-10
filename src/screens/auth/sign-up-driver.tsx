import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, Image, ScrollView } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { colors } from '../../constant'
import UploadImage from '../../components/signup-driver/UploadImage'
import { requestCameraPermission } from '../../Utils/CameraPermission'
import ImagePicker from 'react-native-image-crop-picker';
import { Toast } from 'react-native-toast-notifications'
import { firebase } from '@react-native-firebase/auth'
import { uploadImage } from '../../services/storage-service/StorageService'
import CameraModal from '../../components/common-cpmponents/Camera-modal'

const SignUpDriver = () => {
    const [vehicleImages, setvehicleImages] = useState<string[]>([]);
    const [vehicleDocuments, setvehicleDocuments] = useState<string[]>([]);
    const [license, setLisence] = useState<string[]>([]);
    const [cnic, setCnic] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImageType, setcurrentImageType] = useState<string>();
    const setUploadImage = async (url: string) => {
        console.log(url, 'setting');

        if (currentImageType === 'vehiclePicture') {
            setvehicleImages((prev) => (Array.isArray(prev) ? [...prev, url] : [url]));
        } else if (currentImageType === 'vehicleDocuments') {
            setvehicleDocuments((prev) => (Array.isArray(prev) ? [...prev, url] : [url]));
        } else if (currentImageType === 'lisence') {
            setLisence((prev) => (Array.isArray(prev) ? [...prev, url] : [url]));
        } else if (currentImageType === 'cnic') {
            setCnic((prev) => (Array.isArray(prev) ? [...prev, url] : [url]));
        }
    };
    const openCamera = async () => {
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
                    console.log(url, 'url');
                    if (url) {

                        setUploadImage(url)
                    }
                    Toast.show('Picture Updated', {
                        type: 'success',
                    });
                })
            });

        }
        setModalVisible(false);
    };
    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
        }).then(images => {
            // If multiple images are selected
            console.log(images, 'multiple images');
            images.forEach((image: any) => {
                uploadImage(image.path).then((url) => {
                    if (url) {
                        setUploadImage(url); // Upload each image
                    }
                });
            });
            Toast.show('Multiple pictures updated', {
                type: 'success',
            });

        });
        setModalVisible(false);
    };
    const openModal = (type: string) => {
        setcurrentImageType(type)
        setModalVisible(true);
    }

    return (
        <ScrollView>
            <Box sx={styles.form} >
                <Text sx={styles.heading} >Driver's Information</Text>
                <UploadImage heading='Upload Vehicle Pictures' onPress={() => { openModal('vehiclePicture') }} />
                {vehicleImages && vehicleImages?.length > 0 && <Box sx={styles.imageWrapper} >
                    {vehicleImages.map((data, index) => {
                        return (
                            <Image alt='oops' source={{ uri: data }} key={index} sx={{ width: 100, height: 100, borderRadius: 10, margin: 10 }} />
                        )
                    })}
                </Box>}
                <UploadImage heading='Upload Vehicle Documents' onPress={() => { openModal('vehicleDocuments') }} />
                {vehicleDocuments && vehicleDocuments?.length > 0 && <Box sx={styles.imageWrapper} >
                    {vehicleDocuments.map((data, index) => {
                        return (
                            <Image alt='oops' source={{ uri: data }} key={index} sx={{ width: 100, height: 100, borderRadius: 10 }} />
                        )
                    })}
                </Box>}
                <UploadImage heading='Upload License (front/back)' onPress={() => { openModal('lisence') }} />
                {license && license?.length > 0 && <Box sx={styles.imageWrapper} >
                    {license.map((data, index) => {
                        return (
                            <Image alt='oops' source={{ uri: data }} key={index} sx={{ width: 100, height: 100, borderRadius: 10, margin: 10 }} />
                        )
                    })}
                </Box>}
                <UploadImage heading='Upload CNIC (front/back)' onPress={() => { openModal('cnic') }} />
                {cnic && cnic?.length > 0 && <Box sx={styles.imageWrapper} >
                    {cnic.map((data, index) => {
                        return (
                            <Image alt='oops' source={{ uri: data }} key={index} sx={{ width: 100, height: 100, borderRadius: 10, margin: 10 }} />
                        )
                    })}
                </Box>}
                <CameraModal
                    openCamera={() => openCamera()}
                    openGallery={() => openGallery()}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
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
    imageWrapper: {
        margin: 10, display: "flex", flexDirection: "row", gap: 5, width: "100%"
    }

})