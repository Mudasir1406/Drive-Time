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

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const userData = useSelector((state: StoreState) => state.user);

  return (
    <Block
      paddingBottom={400}
      contentContainerStyle={{paddingHorizontal: '4%'}}>
      <BannerCarousel
        carouselData={['0', '0', '0', '0', '0']}
        isLooped={true}
      />
      <Text style={styles.heading}>Hi, {userData.firstname} Where to?</Text>
      <HStack justifyContent="space-between" marginTop={20}>
        <RideBox
          image={images.carPro}
          tag="Ride with Pro"
          onPress={() => navigation.navigate('SearchRides')}
          background={'#FFD700'}></RideBox>
        <RideBox
          image={images.car}
          tag="Recommanded"
          background={'#4CAF50'}></RideBox>
      </HStack>
      <HStack justifyContent="space-between" marginTop={20}>
        <RideBox image={images.rideHistory}></RideBox>

        <RideBox image={images.star}></RideBox>
      </HStack>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '600',

    color: 'black',
    marginTop: 20,
  },
});
