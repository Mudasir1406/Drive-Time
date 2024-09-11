import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeScreenProps} from '../../types/types';
import Block from '../../components/common/block';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';

const Home: React.FC<HomeScreenProps> = () => {
  const userData = useSelector((state: StoreState) => state.user);
  return (
    <Block>
      <Text>{userData.customerName}</Text>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({});
