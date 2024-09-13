import {
  ColorValue,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {Box, Button, VStack} from '@gluestack-ui/themed';

type IProps = {
  image: string;
  background?: ColorValue;
  tag?: string;
  onPress?: () => void;
};
const {width} = Dimensions.get('window');
const RideBox: React.FunctionComponent<IProps> = ({
  image,
  background,
  tag,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.contanier}
      onPress={onPress}
      activeOpacity={0.8}>
      {tag && (
        <View style={[styles.tag, {backgroundColor: background}]}>
          <Text style={styles.text}>{tag}</Text>
        </View>
      )}
      <Image source={{uri: image}} style={styles.image} />
    </TouchableOpacity>
  );
};

export default RideBox;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  contanier: {
    width: '48%',
    height: width * 0.44,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 12,
  },
  tag: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    borderBottomLeftRadius: 20,
    zIndex: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
});
