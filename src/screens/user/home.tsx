import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeScreenProps} from '../../types/types';
import Block from '../../components/common/block';

const Home: React.FC<HomeScreenProps> = () => {
  return (
    <Block>
      <Text>home</Text>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({});
