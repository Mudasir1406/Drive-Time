import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant';
import {Box} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import CustomButton from '../login-types/custom-button';

const Earnings = () => {
  return (
    <View style={styles.box}>
      <Box>
        <Text sx={styles.text}>Wallet Balance</Text>
        <Text>$199.78</Text>
      </Box>
      <Box sx={{width: '50%'}}>
        <CustomButton text="WITHDRAW" handlePress={() => {}} />
      </Box>
    </View>
  );
};

export default Earnings;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F1F1F0',
    width: '90%',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 700,
  },
});
