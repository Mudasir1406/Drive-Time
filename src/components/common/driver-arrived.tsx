import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant';
import {Box, Text, Button, HStack, VStack} from '@gluestack-ui/themed';
import {UserSliceType} from '../../redux/user/slice';
import {Image} from 'react-native';

type IProps = {
  onPressOk: () => void;
};
const DriverArrived: React.FC<IProps> = ({onPressOk}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.textStyle}>Your Driver has arrived!</Text>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
        }}>
        <Button
          sx={{
            width: '30%',
            marginTop: 10,
            backgroundColor: colors.green,
          }}>
          <Text sx={styles.textStyle} onPress={onPressOk}>
            OK
          </Text>
        </Button>
      </Box>
    </View>
  );
};

export default DriverArrived;

const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    elevation: 8,
    backgroundColor: colors.black,
    padding: 22,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center', // Centers the box horizontally
    top: 60,
  },

  textStyle: {
    color: colors.white,
    fontWeight: 600,
    fontSize: 18,
  },
  textStyle2: {
    color: colors.white,
    fontWeight: 400,
    fontSize: 13,
    marginLeft: 10,
  },
});
