import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DriverEditProfileScreenProps} from '../../types/types';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import LogoSection from '../../components/common/logo-section';
import {
  Box,
  Center,
  Image,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import CustomButton from '../../components/login-types/custom-button';
import {HStack} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {colors} from '../../constant';
import {useUser} from '../../hooks/useUser';
import Input from '../../components/common/input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CameraModal from '../../components/common/camera-modal';
import {requestCameraPermission} from '../../utils/camera-permission';
import ImagePicker from 'react-native-image-crop-picker';
import {Toast} from 'react-native-toast-notifications';
import {uploadImage} from '../../services/storage-service/StorageService';

type UserField = 'vehicleImages' | 'vehicleDocuments' | 'license';

const EditProfile: React.FC<DriverEditProfileScreenProps> = ({navigation}) => {
  const {updateUserProfile} = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const userData = useSelector((state: StoreState) => state.user);
  const [values, setvalues] = useState(userData);
  const [selectedImageCatgeory, setselectedImageCatgeory] = useState('');

  const handleChange = (field: string) => (text: string) => {
    setvalues(prev => ({...prev, [field]: text}));
  };

  const handleGenderChange = (itemValue: string, feild: string) => {
    setvalues(prev => ({...prev, [feild]: itemValue}));
  };

  const openCamera = async () => {
    const test = await requestCameraPermission();

    if (test) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        uploadImage(image.path).then(url => {
          if (url && selectedImageCatgeory) {
            setvalues(prevValues => ({
              ...prevValues,
              [selectedImageCatgeory]: [
                ...(prevValues.vehicleDocuments || []),
                url,
              ].filter(Boolean), // Ensuring all values are strings
            }));
            Toast.show('Picture Uploaded', {
              type: 'success',
            });
          }
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
          if (url && selectedImageCatgeory) {
            setvalues(prevValues => ({
              ...prevValues,
              [selectedImageCatgeory]: [
                ...(prevValues.vehicleDocuments || []),
                url,
              ].filter(Boolean), // Ensuring all values are strings
            }));
          }
        });
      });
      Toast.show('Picture Uploaded', {
        type: 'success',
      });
    });
    setModalVisible(false);
  };

  const handleRemoveImage = (field: UserField, index: number) => {
    setvalues(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index), // Cast to string[] to ensure type safety
    }));
    Toast.show('Picture Removed', {
      type: 'success',
    });
  };

  const handleSubmit = async () => {
    let data = await updateUserProfile(userData.uid, values);
    if (data) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <Box sx={styles.main}>
        <Center sx={{marginBottom: 30}}>
          <LogoSection />
        </Center>

        <Input
          label="Username"
          placeholder="Enter Username"
          onChangeText={handleChange('username')}
          value={values.username}
        />

        <HStack space="sm" reversed={false}>
          <Box sx={styles.inputBox}>
            <Input
              label="First Name"
              placeholder="Enter First Name"
              onChangeText={handleChange('firstname')}
              value={values.firstname}
            />
          </Box>
          <Box sx={styles.inputBox}>
            <Input
              label="Last Name"
              placeholder="Enter Last Name"
              onChangeText={handleChange('lastname')}
              value={values.lastname}
            />
          </Box>
        </HStack>
        <Input
          label="Phone Number"
          placeholder="Enter Phone Number"
          onChangeText={handleChange('phone')}
          value={values.phone}
        />
        <Input
          label="DOB"
          placeholder="YYYY-MM-DD"
          onChangeText={handleChange('dob')}
          value={values.dob}
        />

        <Box sx={styles.genderContainer}>
          <Text sx={styles.label}>Gender</Text>
          <Select
            selectedValue={values.gender}
            onValueChange={itemValue =>
              handleGenderChange(itemValue, 'gender')
            }>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select Gender" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Male" value="male" />
                <SelectItem label="Female" value="female" />
                <SelectItem label="Other" value="other" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Box>
        <Box sx={styles.genderContainer}>
          <Text sx={styles.label}>Vehicle Type</Text>
          <Select
            selectedValue={values.gender}
            onValueChange={itemValue =>
              handleGenderChange(itemValue, 'VehicleType')
            }>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder="Select Gender"
                defaultValue={values.VehicleType}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Car" value="car" />
                <SelectItem label="Motor Cycle" value="bike" />
                <SelectItem label="Other" value="other" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Box>

        <HStack space="sm" reversed={false}>
          <Box sx={styles.inputBox}>
            <Input
              label="Year Built"
              placeholder="Enter Year Built"
              onChangeText={handleChange('make')}
              value={values.make}
            />
          </Box>
          <Box sx={styles.inputBox}>
            <Input
              label="Vehicle No"
              placeholder="Enter Vehicle No"
              onChangeText={handleChange('VehicleNo')}
              value={values.VehicleNo}
            />
          </Box>
        </HStack>
        <Box sx={styles.inputBox}>
          <Input
            label="Company Name"
            placeholder="Enter Company Name"
            onChangeText={handleChange('company')}
            value={values.company}
          />
        </Box>
        <Box sx={styles.inputBox}>
          <Input
            label="Registration No"
            placeholder="Enter Registration No"
            onChangeText={handleChange('registrationNo')}
            value={values.registrationNo}
          />
        </Box>
        <Box sx={styles.inputBox}>
          <Text style={styles.label}>Vehicle Documents</Text>
          <Box sx={styles.pictureBox}>
            {values?.vehicleDocuments &&
              values?.vehicleDocuments?.length > 0 &&
              values?.vehicleDocuments.map((data, index) => {
                return (
                  <Box key={index} sx={styles.imageRelative}>
                    <MaterialIcons
                      onPress={() =>
                        handleRemoveImage('vehicleDocuments', index)
                      }
                      name="cancel"
                      style={styles.cancel}
                    />
                    <Image alt="ops" sx={styles.img} source={{uri: data}} />
                  </Box>
                );
              })}
            {values?.vehicleDocuments &&
              values?.vehicleDocuments?.length < 4 && (
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                    setselectedImageCatgeory('vehicleDocuments');
                  }}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.grey,
                    opacity: 0.8,
                  }}>
                  <MaterialIcons
                    name="add-a-photo"
                    style={{color: colors.white, fontSize: 30}}
                  />
                </Pressable>
              )}
          </Box>
        </Box>
        <Box sx={styles.inputBox}>
          <Text style={styles.label}>License</Text>
          <Box sx={styles.pictureBox}>
            {values?.license &&
              values?.license?.length > 0 &&
              values?.license.map((data, index) => {
                return (
                  <Box key={index} sx={styles.imageRelative}>
                    <MaterialIcons
                      onPress={() => handleRemoveImage('license', index)}
                      name="cancel"
                      style={styles.cancel}
                    />
                    <Image alt="ops" sx={styles.img} source={{uri: data}} />
                  </Box>
                );
              })}
            {values?.license && values?.license?.length < 2 && (
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                  setselectedImageCatgeory('license');
                }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.grey,
                  opacity: 0.8,
                }}>
                <MaterialIcons
                  name="add-a-photo"
                  style={{color: colors.white, fontSize: 30}}
                />
              </Pressable>
            )}
          </Box>
        </Box>
        <Box sx={styles.inputBox}>
          <Text style={styles.label}>Vehicle Images</Text>
          <Box sx={styles.pictureBox}>
            {values?.vehicleImages &&
              values?.vehicleImages?.length > 0 &&
              values?.vehicleImages.map((data, index) => {
                return (
                  <Box key={index} sx={styles.imageRelative}>
                    <MaterialIcons
                      onPress={() => handleRemoveImage('vehicleImages', index)}
                      name="cancel"
                      style={styles.cancel}
                    />
                    <Image alt="ops" sx={styles.img} source={{uri: data}} />
                  </Box>
                );
              })}
            {values?.vehicleImages && values?.vehicleImages?.length < 4 && (
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                  setselectedImageCatgeory('vehicleImages');
                }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.grey,
                  opacity: 0.8,
                }}>
                <MaterialIcons
                  name="add-a-photo"
                  style={{color: colors.white, fontSize: 30}}
                />
              </Pressable>
            )}
          </Box>
        </Box>

        <Box sx={styles.submitButtonContainer}>
          <CustomButton
            text="Save Changes"
            handlePress={() => {
              handleSubmit();
            }}
          />
        </Box>
      </Box>
      <CameraModal
        openCamera={() => openCamera()}
        openGallery={() => openGallery()}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.black,
  },
  inputBox: {
    flex: 1,
  },
  genderContainer: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  submitButtonContainer: {
    marginTop: 20,

    width: '100%',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 15,
  },
  pictureBox: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  imageRelative: {
    position: 'relative',
  },
  img: {
    borderRadius: 10,
    width: 80,
    height: 80,
    objectFit: 'cover',
  },
  cancel: {
    position: 'absolute',
    right: 3,
    top: 3,
    zIndex: 99,
    fontSize: 25,
  },
});
