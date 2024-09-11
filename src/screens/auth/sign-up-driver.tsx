import {Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Image, ScrollView} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {colors} from '../../constant';
import UploadImage from '../../components/signup-driver/UploadImage';
import {requestCameraPermission} from '../../utils/CameraPermission';
import ImagePicker from 'react-native-image-crop-picker';
import {Toast} from 'react-native-toast-notifications';
import {uploadImage} from '../../services/storage-service/StorageService';
import CameraModal from '../../components/common-cpmponents/Camera-modal';
import DriverSignUpForm from '../../components/signup-driver/DriverSignUpForm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../hooks/useAuth';
import CustomButton from '../../components/login-types/custom-button';

const SignUpDriver: React.FC = () => {
  const {signup} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [personalInfo, setpersonalInfo] = useState(false);
  const [vehicleImages, setvehicleImages] = useState<string[]>([]);
  const [vehicleDocuments, setvehicleDocuments] = useState<string[]>([]);
  const [license, setLisence] = useState<string[]>([]);
  const [cnic, setCnic] = useState<string[]>([]);
  const [currentImageType, setcurrentImageType] = useState<string>();
  const [PersonalData, setPersonalData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    phone: '',
    dob: '',
    gender: '',
    email: '',
    make: '',
    company: '',
    VehicleNo: '',
    VehicleType: '',
    registrationNo: '',
    password: '',
  });

  const setUploadImage = async (url: string) => {
    if (currentImageType === 'vehiclePicture') {
      setvehicleImages(prev => (Array.isArray(prev) ? [...prev, url] : [url]));
    } else if (currentImageType === 'vehicleDocuments') {
      setvehicleDocuments(prev =>
        Array.isArray(prev) ? [...prev, url] : [url],
      );
    } else if (currentImageType === 'lisence') {
      setLisence(prev => (Array.isArray(prev) ? [...prev, url] : [url]));
    } else if (currentImageType === 'cnic') {
      setCnic(prev => (Array.isArray(prev) ? [...prev, url] : [url]));
    }
  };

  const openCamera = async () => {
    const test = await requestCameraPermission();

    if (test) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        uploadImage(image.path).then(url => {
          if (url) {
            setUploadImage(url);
          }
          Toast.show('Picture Updated', {
            type: 'success',
          });
        });
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
      console.log(images, 'multiple images');
      images.forEach((image: any) => {
        uploadImage(image.path).then(url => {
          if (url) {
            setUploadImage(url);
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
    setcurrentImageType(type);
    setModalVisible(true);
  };

  const SubmitDriverSignUp = () => {
    signup({
      ...PersonalData,
      userType: 'driver',
      vehicleImages: vehicleImages,
      vehicleDocuments: vehicleDocuments,
      license: license,
      cnic: cnic,
    });
  };

  return (
    <ScrollView>
      {personalInfo ? (
        <Box sx={styles.form}>
          <Pressable
            onPress={() => {
              setpersonalInfo(false);
            }}
            style={{width: '100%'}}>
            <Ionicons name="arrow-back-circle-sharp" style={{fontSize: 30}} />
          </Pressable>
          <Text sx={styles.heading}>Driver's Information</Text>
          {vehicleImages?.length < 5 && (
            <UploadImage
              heading="Upload Vehicle Pictures"
              onPress={() => {
                openModal('vehiclePicture');
              }}
            />
          )}
          {vehicleImages && vehicleImages?.length > 0 && (
            <Box sx={styles.imageWrapper}>
              {vehicleImages.map((data, index) => {
                return (
                  <Image
                    alt="oops"
                    source={{uri: data}}
                    key={index}
                    sx={{width: 100, height: 100, borderRadius: 10, margin: 10}}
                  />
                );
              })}
            </Box>
          )}
          {vehicleDocuments?.length < 5 && (
            <UploadImage
              heading="Upload Vehicle Documents"
              onPress={() => {
                openModal('vehicleDocuments');
              }}
            />
          )}
          {vehicleDocuments && vehicleDocuments?.length > 0 && (
            <Box sx={styles.imageWrapper}>
              {vehicleDocuments.map((data, index) => {
                return (
                  <Image
                    alt="oops"
                    source={{uri: data}}
                    key={index}
                    sx={{width: 100, height: 100, borderRadius: 10}}
                  />
                );
              })}
            </Box>
          )}
          {license?.length < 3 && (
            <UploadImage
              heading="Upload License (front/back)"
              onPress={() => {
                openModal('lisence');
              }}
            />
          )}
          {license && license?.length > 0 && (
            <Box sx={styles.imageWrapper}>
              {license.map((data, index) => {
                return (
                  <Image
                    alt="oops"
                    source={{uri: data}}
                    key={index}
                    sx={{width: 100, height: 100, borderRadius: 10, margin: 10}}
                  />
                );
              })}
            </Box>
          )}
          {cnic?.length < 3 && (
            <UploadImage
              heading="Upload CNIC (front/back)"
              onPress={() => {
                openModal('cnic');
              }}
            />
          )}
          {cnic && cnic?.length > 0 && (
            <Box sx={styles.imageWrapper}>
              {cnic.map((data, index) => {
                return (
                  <Image
                    alt="oops"
                    source={{uri: data}}
                    key={index}
                    sx={{width: 100, height: 100, borderRadius: 10, margin: 10}}
                  />
                );
              })}
            </Box>
          )}
          <Box sx={styles.submitButtonContainer}>
            <CustomButton text="Sign up" handlePress={SubmitDriverSignUp} />
          </Box>
          <CameraModal
            openCamera={() => openCamera()}
            openGallery={() => openGallery()}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Box>
      ) : (
        <DriverSignUpForm
          PersonalData={PersonalData}
          setpersonalInfo={setpersonalInfo}
          setPersonalData={setPersonalData}
        />
      )}
    </ScrollView>
  );
};

export default SignUpDriver;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    color: colors.black,
    fontSize: 25,
    textAlign: 'left',
    width: '100%',
    fontWeight: '600',
  },
  imageWrapper: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  submitButtonContainer: {
    marginTop: 20,

    width: '100%',
  },
});
