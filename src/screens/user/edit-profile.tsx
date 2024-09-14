import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  DriverEditProfileScreenProps,
  UserEditProfileScreenProps,
} from '../../types/types';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import CustomInput from '../../components/common/Input-field';
import LogoSection from '../../components/common/logo-section';
import {
  Box,
  Center,
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
import {Formik} from 'formik';
import {signupValidationSchema} from '../../utils/validation-schemas';
import CustomButton from '../../components/login-types/custom-button';
import {HStack} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {colors} from '../../constant';
import {useUser} from '../../hooks/useUser';

const EditProfile: React.FC<UserEditProfileScreenProps> = ({navigation}) => {
  const {updateUserProfile} = useUser();
  const userData = useSelector((state: StoreState) => state.user);

  console.log(userData, 'user');
  return (
    <Formik
      initialValues={userData}
      validationSchema={signupValidationSchema}
      onSubmit={values => {
        console.log('hit');
        updateUserProfile(userData.uid, values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => {
        useEffect(() => {
          console.log('Form Values:', {...values});
        }, [values]);

        return (
          <ScrollView>
            <Box sx={styles.main}>
              <Center sx={{marginBottom: 30}}>
                <LogoSection />
              </Center>

              <CustomInput
                label="Username"
                name="username"
                placeholder="Enter Username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />

              <HStack space="sm" reversed={false}>
                <Box sx={styles.inputBox}>
                  <CustomInput
                    label="First Name"
                    name="firstname"
                    placeholder="Enter First Name"
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                  />
                </Box>
                <Box sx={styles.inputBox}>
                  <CustomInput
                    label="Last Name"
                    name="lastname"
                    placeholder="Enter Last Name"
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                  />
                </Box>
              </HStack>
              <CustomInput
                label="Phone"
                name="phone"
                placeholder="Enter Phone Number"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              <CustomInput
                label="Date of Birth"
                name="dob"
                placeholder="YYYY-MM-DD"
                onChangeText={handleChange('dob')}
                onBlur={handleBlur('dob')}
                value={values.dob}
              />

              <Box sx={styles.genderContainer}>
                <Text sx={styles.label}>Gender</Text>
                <Select
                  selectedValue={values.gender}
                  onValueChange={itemValue =>
                    setFieldValue('gender', itemValue)
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

              <Box sx={styles.submitButtonContainer}>
                <CustomButton text="Save Changes" handlePress={handleSubmit} />
              </Box>
            </Box>
          </ScrollView>
        );
      }}
    </Formik>
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
  },
  submitButtonContainer: {
    marginTop: 20,

    width: '100%',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 15,
  },
});
