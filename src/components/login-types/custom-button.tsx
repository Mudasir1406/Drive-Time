import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Button, ButtonText} from '@gluestack-ui/themed';
import {colors} from '../../constant';

const CustomButton = ({text, handlePress}) => {
  return (
    <Box>
      <Button onPress={handlePress} sx={styles.btn}>
        <ButtonText sx={{textAlign: 'center', color: colors.black}}>
          {text}
        </ButtonText>
      </Button>
    </Box>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    borderColor: colors.black,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 2,
    backgroundColor: 'transparent',
  },
});
