import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Box, Image } from '@gluestack-ui/themed';
import { images } from '../../constant';
import CustomButton from '../../components/login-types/custom-button';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/reducer';
import { LoginTypeNavigation } from '../../types/types';
import { StoreDispatch } from '../../redux/reduxStore';
import { userActions } from '../../redux/user/slice';
type IProps = {
  navigation: LoginTypeNavigation;
};

const LoginTypes: React.FC<IProps> = ({ navigation }) => {
  const dispatch = useDispatch<StoreDispatch>();
  return (
    <Box sx={styles.container}>
      <Image
        source={{ uri: images.onboardImage }} // Image from URI
        style={styles.image}
        alt="oops"
      />
      <Box sx={styles.boxBtn}>
        <CustomButton
          text={'Click to start as a Driver'}
          handlePress={() => {
            navigation.navigate('SignUpDriver');
          }}
        />
      </Box>
      <Box sx={styles.boxBtn}>
        <CustomButton
          text={' Click to start as a User'}
          handlePress={() => {
            navigation.navigate('SignUpUser');
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',

    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  boxBtn: {
    width: '90%',
  },
  image: {
    height: 350,
    width: 350,
  },
});
