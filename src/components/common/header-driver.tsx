import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image, Switch} from '@gluestack-ui/themed';
import {images} from '../../constant';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootBottomTabParamsDriver} from '../../types/types';
type Iprops = {
  title: string;
};
const CustomDriverHeader: React.FC<Iprops> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootBottomTabParamsDriver>>();
  const [isChecked, setIsChecked] = useState(false);
  const userData = useSelector((state: StoreState) => state.user);
  return (
    <View
      style={{
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          source={{
            uri:
              userData && userData?.profile ? userData?.profile : images.logo,
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
          alt="oops"
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Switch
        defaultValue={true}
        size="lg"
        isChecked={isChecked}
        onToggle={() => setIsChecked(!isChecked)}
      />
    </View>
  );
};

export default CustomDriverHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '600',
  },
});
