import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image, Switch} from '@gluestack-ui/themed';
<<<<<<< HEAD
import {colors, images} from '../../constant';
=======
import {images} from '../../constant';
>>>>>>> c454b9cd86902c8c2340be51a53ab475d90fded8
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
<<<<<<< HEAD
        borderRadius: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.transparent,
        position: 'absolute',
=======
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
>>>>>>> c454b9cd86902c8c2340be51a53ab475d90fded8
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
<<<<<<< HEAD
            width: 45,
            height: 45,
            borderRadius: 22.5,
=======
            width: 40,
            height: 40,
            borderRadius: 20,
>>>>>>> c454b9cd86902c8c2340be51a53ab475d90fded8
          }}
          alt="oops"
        />
      </Pressable>
<<<<<<< HEAD
      {/* <Text style={styles.title}>{title}</Text> */}
      {/* <Switch
=======
      <Text style={styles.title}>{title}</Text>
      <Switch
>>>>>>> c454b9cd86902c8c2340be51a53ab475d90fded8
        defaultValue={true}
        size="lg"
        isChecked={isChecked}
        onToggle={() => setIsChecked(!isChecked)}
<<<<<<< HEAD
      /> */}
=======
      />
>>>>>>> c454b9cd86902c8c2340be51a53ab475d90fded8
    </View>
  );
};

export default CustomDriverHeader;

const styles = StyleSheet.create({
  title: {
<<<<<<< HEAD
    fontSize: 22,
    fontWeight: '600',
    color: colors.white,
=======
    fontSize: 25,
    fontWeight: '600',
>>>>>>> c454b9cd86902c8c2340be51a53ab475d90fded8
  },
});
