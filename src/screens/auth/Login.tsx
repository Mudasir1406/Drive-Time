import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Box, Image } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { colors } from '../../constant';
import CustomInput from '../../components/common-cpmponents/Input-field';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../utils/validation-schemas';
import CustomButton from '../../components/login-types/custom-button';
import { useAuth } from '../../hooks/useAuth';
import { images } from '../../constant';
import { LoginTypeNavigation } from '../../types/types';

type Iprops = {
  navigation: LoginTypeNavigation
}

const Login: React.FC<Iprops> = ({ navigation }) => {

  const { login, googleSignup } = useAuth();
  const handleGoogleSign = () => {
    googleSignup();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={values => login(values)}>
      {({ handleChange, handleBlur, handleSubmit, values }) => {
        return (
          <Box sx={styles.main}>
            <Text sx={styles.textStyle}>Welcome back,Login</Text>
            <Box sx={{ width: '100%' }}>
              <CustomInput
                label="Email"
                name="email"
                placeholder="Enter Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <CustomInput
                label="Password"
                name="password"
                placeholder="Enter Password"
                secureTextEntry={true} // Ensure password is hidden
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <CustomButton text="Login" handlePress={handleSubmit} />
            </Box>
            <TouchableOpacity style={{ width: '100%', marginTop: 5 }} onPress={() => { navigation.navigate('forgetPassword') }} >
              <Text sx={styles.forgotStyle}>Forgot Password?</Text>
            </TouchableOpacity>
            <Text sx={styles.forgotStyle}>OR</Text>
            <Pressable style={styles.circle} onPress={handleGoogleSign}>
              <Image
                source={{ uri: images.googleIcon }}
                alt="oops"
                sx={styles.googleIcon}
              />
            </Pressable>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 35,
  },
  textStyle: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 700,
    color: colors.black,
  },
  forgotStyle: {
    color: colors.black,
    fontWeight: 700,
    fontSize: 15,
    textAlign: 'right',
  },
  googleIcon: {
    height: 30,
    width: 30,
    // marginTop: 10,
  },
  circle: {
    marginTop: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    elevation: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
