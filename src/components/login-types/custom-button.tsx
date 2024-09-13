import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {Box, Button, ButtonText} from '@gluestack-ui/themed';
import {colors} from '../../constant';
import {SxProps} from '@gluestack-style/react/lib/typescript/types';
type IProps = {
  text: string;
  handlePress: () => void;
  contanierStyles?: Partial<SxProps<StyleProp<ViewStyle>>>;
};
const CustomButton: React.FC<IProps> = ({
  text,
  handlePress,
  contanierStyles,
}) => {
  return (
    <Box sx={contanierStyles}>
      <Button onPress={handlePress} sx={styles.btn}>
        <ButtonText
          sx={{width: '100%', textAlign: 'center', color: colors.white}}>
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
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',

    backgroundColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
