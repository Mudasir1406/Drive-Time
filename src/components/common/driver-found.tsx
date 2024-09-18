import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant';
import {Box, Text, Button, HStack, VStack} from '@gluestack-ui/themed';
import {UserSliceType} from '../../redux/user/slice';
import {Image} from 'react-native';

type IProps = {
  driverInfo: UserSliceType;
  onPressOk: () => void;
};
const DriverFound: React.FC<IProps> = ({driverInfo, onPressOk}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.textStyle}>
        A Driver is on it's way to pick you up
      </Text>
      <HStack marginVertical={20}>
        <Image
          source={{uri: driverInfo.profile}}
          width={100}
          height={100}
          style={{borderRadius: 20}}></Image>
        <VStack>
          <Text style={styles.textStyle2}>
            {driverInfo.firstname} {driverInfo.lastname}
          </Text>
          <Text style={styles.textStyle2}>{driverInfo.VehicleNo}</Text>
          <Text style={styles.textStyle2}>{driverInfo.VehicleType}</Text>
          <Text style={styles.textStyle2}>{driverInfo.email}</Text>
          <Text style={styles.textStyle2}>{driverInfo.gender}</Text>
          <Text style={styles.textStyle2}>{driverInfo.phone}</Text>
        </VStack>
      </HStack>

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

export default DriverFound;

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
