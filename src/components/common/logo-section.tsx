import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Image} from '@gluestack-ui/themed';
import {images} from '../../constant';

const LogoSection = () => {
  return (
    <Box>
      <Image
        source={{uri: images.logo}}
        alt="logo"
        sx={{height: 120, width: 120}}
      />
    </Box>
  );
};

export default LogoSection;

const styles = StyleSheet.create({});
