import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { colors } from '../../constant';
type IProps = {
  text: string;
  handlePress: () => void;
};
const CustomButton: React.FC<IProps> = ({ text, handlePress }) => {
  return (
    <Box>
      <Button onPress={handlePress} sx={styles.btn}>
        <ButtonText sx={{ textAlign: 'center', color: colors.white }}>
          {text}
        </ButtonText>
      </Button>
    </Box>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    // borderColor: colors.black,
    // borderWidth: 1,
    borderStyle: 'solid',
    padding: 2,
    backgroundColor: '#4A5B61',
    elevation: 4,

    marginTop: -10
  },
});
