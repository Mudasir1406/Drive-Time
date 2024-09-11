import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  Box,
  Button,
  ChevronDownIcon,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {HStack} from '@gluestack-ui/themed';
import {Formik} from 'formik';

import CustomInput from '../../components/common-cpmponents/Input-field';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectBackdrop,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
} from '@gluestack-ui/themed';
import {Icon} from '@gluestack-ui/themed';
import CustomButton from '../../components/login-types/custom-button';
import {colors} from '../../constant';
import {useAuth} from '../../hooks/useAuth';
import {signupValidationSchema} from '../../utils/validation-schemas';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';

const UserSignUp = () => {
  const {signup} = useAuth();
  const user = useSelector((data: StoreState) => data.user);
  console.log(user, 'user');
  return (
    <Formik
      initialValues={{
        username: '',
        firstname: '',
        lastname: '',
        phone: '',
        dob: '',
        gender: '',
        email: '',
        password: '',
      }}
      validationSchema={signupValidationSchema}
      onSubmit={values => {
        signup({...values, userType: user.type || ''});
      }}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => {
        useEffect(() => {
          console.log('Form Values:', {...values, userType: user.type});
        }, [values]);

        return (
          <ScrollView>
            <Box sx={styles.main}>
              <Text sx={styles.heading}>User Sign Up</Text>

              <CustomInput
                label="Username"
                name="username"
                placeholder="Enter Username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              <CustomInput
                label="Email"
                name="email"
                placeholder="Enter Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <CustomInput
                label="Password"
                name="password"
                placeholder="Enter Password"
                secureTextEntry={true} // Ensure password is hidden
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
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
                <CustomButton text="Sign up" handlePress={handleSubmit} />
              </Box>
            </Box>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default UserSignUp;

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
});
