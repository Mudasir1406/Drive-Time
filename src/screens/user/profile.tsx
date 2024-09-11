import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileScreenProps } from '../../types/types';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constant';

const Profile: React.FunctionComponent<ProfileScreenProps> = () => {
  const { logOut } = useAuth();
  return (
    <View>
      <TouchableOpacity style={{ width: '100%', marginTop: 5 }} onPress={() => { logOut() }} >
        <Text style={styles.forgotStyle}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  forgotStyle: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'right',
  },
});
