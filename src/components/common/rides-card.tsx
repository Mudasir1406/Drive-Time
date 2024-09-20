import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Box, Text} from '@gluestack-ui/themed';
import {colors} from '../../constant';
type IProps = {
  price: string;
  dateTime: {
    _nanoseconds: number;
    _seconds: number;
  };
  distance: string;
};
const RidesCards: React.FC<IProps> = ({dateTime, price, distance}) => {
  return (
    <Box sx={styles.box}>
      <Box
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text sx={styles.text}>Date</Text>
        <Text sx={styles.text2}>
          {new Date(dateTime?._seconds * 1000).toLocaleString()}
        </Text>
      </Box>
      <Box
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text sx={styles.text}>Price </Text>
        <Text sx={styles.text2}>{price}</Text>
      </Box>
      <Box
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text sx={styles.text}>Distance </Text>
        <Text sx={styles.text2}>{distance}</Text>
      </Box>
    </Box>
  );
};

export default RidesCards;

const styles = StyleSheet.create({
  box: {
    marginVertical: 10,
    backgroundColor: '#F1F1F0',
    width: '95%',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    elevation: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 700,
  },
  text2: {
    fontSize: 18,

    fontWeight: 600,
  },
});
