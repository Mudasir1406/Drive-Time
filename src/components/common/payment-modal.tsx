import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant';
import {Box, Text, Button} from '@gluestack-ui/themed';
import {StripeProvider} from '@stripe/stripe-react-native';

type IProps = {
  onPressOk: () => void;
  amount: number;
};
const PaymentModal: React.FC<IProps> = ({amount, onPressOk}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.textStyle}>
        Your Ride is completed Please Pay the Amount ${amount} To comtinue
      </Text>
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
            Pay
          </Text>
        </Button>
      </Box>
    </View>
  );
};

export default PaymentModal;

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
