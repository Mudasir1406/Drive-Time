import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant';
import {Box, Text, Button} from '@gluestack-ui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type IProps = {
  fare: number | undefined;
};
const RideComplete: React.FC<IProps> = ({fare}) => {
  return (
    <View style={styles.main}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
        }}>
        <MaterialIcons
          name="attach-money"
          style={{color: 'gold', fontSize: 30}}
        />
        <Text sx={styles.textStyle}>{fare}</Text>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '15px',
        }}>
        <Entypo name="check" style={{color: 'green', fontSize: 30}} />
        <Text sx={styles.textStyle}>Ride Has Been Completed</Text>
      </Box>

      <Box sx={{paddingHorizontal: 10}}>
        <Text sx={styles.textStyle2}>
          When you recieved payment from user click ok to complete ride
        </Text>
      </Box>
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
          <Text sx={styles.textStyle}>OK</Text>
        </Button>
      </Box>
    </View>
  );
};

export default RideComplete;

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
  },
});
