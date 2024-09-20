import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {HomeScreenProps} from '../../types/types';
import Block from '../../components/common/block';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import {BannerCarousel, RideBox} from '../../components';
import {HStack} from '@gluestack-ui/themed';
import {images} from '../../constant';
import {getRides} from '../../services/firebase-realtime/rides-services';

const DriverHome: React.FC<HomeScreenProps> = ({navigation}) => {
  const userData = useSelector((state: StoreState) => state.user);

  return (
    <Block
      paddingBottom={400}
      contentContainerStyle={{paddingHorizontal: '4%'}}>
      <BannerCarousel
        carouselData={['0', '0', '0', '0', '0']}
        isLooped={true}
      />
      <Text style={styles.heading}>
        Hi, {userData.firstname} Ready to Drive?
      </Text>
      <HStack justifyContent="space-between" marginTop={20}></HStack>
    </Block>
  );
};

export default DriverHome;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '600',

    color: 'black',
    marginTop: 20,
  },
});
