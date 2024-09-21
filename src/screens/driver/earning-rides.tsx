import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';
import Block from '../../components/common/block';
import {Text} from '@gluestack-ui/themed';
import {colors} from '../../constant';
import Earnings from '../../components/common/Earnings';
import RidesCards from '../../components/common/rides-card'; // Custom rides card component
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import useDriverRides from '../../hooks/useDriverRides';

const EarningRides = () => {
  const userData = useSelector((state: StoreState) => state.user);
  const {rides, loading, error} = useDriverRides(userData?.uid);

  return (
    <View style={styles.main}>
      <Text sx={styles.txt}>My Earnings</Text>
      <Earnings />

      <Text sx={styles.txt}>Your Previous Rides</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.black} />
      ) : error ? (
        <Text sx={styles.txt}>Error: {error}</Text>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={item => item.id}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => (
            <RidesCards
              price={item.price}
              dateTime={item.dateTime}
              distance={item.distance}
            />
          )}
        />
      )}
    </View>
  );
};

export default EarningRides;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 10,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  txt: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 20,
  },
});
