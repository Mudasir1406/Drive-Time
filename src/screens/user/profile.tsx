import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {colors} from '../../constant';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import {Box, Avatar, AvatarImage} from '@gluestack-ui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DriverProfileScreenProps} from '../../types/types';
import {requestCameraPermission} from '../../utils/camera-permission';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileModal from '../../components/common/profile-image-modal';
import {uploadImage} from '../../services/storage-service/StorageService';
import {useUser} from '../../hooks/useUser';

interface HelpBoxProps {
  text: string;
  icon: ReactNode;
}

const HelpBox: React.FC<HelpBoxProps> = ({text, icon}) => {
  return (
    <Box sx={styles.singleBox}>
      {icon}
      <Text style={{color: colors.white, fontSize: 18}}>{text}</Text>
    </Box>
  );
};

const Profile: React.FC<DriverProfileScreenProps> = ({navigation}) => {
  const userData = useSelector((state: StoreState) => state.user);
  console.log(userData, 'userDa');
  const {updateUserProfile} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const openCamera = async () => {
    const test = await requestCameraPermission();

    if (test) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        uploadImage(image.path).then(url => {
          updateUserProfile(userData.uid, {...userData, profile: url});
        });
      });
    }
    setModalVisible(false);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      uploadImage(image.path).then(url => {
        updateUserProfile(userData.uid, {...userData, profile: url});
      });
    });
    setModalVisible(false);
  };
  const renderAvatar = () => {
    if (userData?.profile) {
      return (
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Avatar>
            <AvatarImage source={{uri: userData?.profile}} alt="profile" />
          </Avatar>
        </Pressable>
      );
    } else {
      return (
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Avatar sx={styles.avatar}>
            <Text style={styles.avatarText}>
              {userData.firstname && userData?.firstname.charAt(0)}
            </Text>
          </Avatar>
        </Pressable>
      );
    }
  };

  const boxContent = {
    help: {
      text: 'Help',
      icon: (
        <FontAwesome5
          name="hands-helping"
          style={{color: colors.white, fontSize: 20}}
        />
      ),
    },
    wallet: {
      text: 'Wallet',
      icon: (
        <FontAwesome5
          name="wallet"
          style={{color: colors.white, fontSize: 20}}
        />
      ),
    },
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          padding: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Box>
          <Text style={{fontSize: 25, fontWeight: '700'}}>Profile</Text>
          <Text style={{fontSize: 30, color: colors.black, fontWeight: '700'}}>
            Welcome, {userData?.firstname}
          </Text>
        </Box>
        <Box sx={styles.ImageBox}>{renderAvatar()}</Box>
      </View>
      <View style={styles.squareBox}>
        <HelpBox text={boxContent.help.text} icon={boxContent.help.icon} />
        <HelpBox text={boxContent.wallet.text} icon={boxContent.wallet.icon} />
      </View>
      <View style={[styles.squareBox, {flexDirection: 'column', padding: 30}]}>
        <Pressable
          style={styles.infoPages}
          onPress={() => navigation.navigate('EditProfile')}>
          <AntDesign
            name="profile"
            style={{color: colors.black, fontSize: 25}}
          />
          <Text style={{color: colors.black, fontSize: 20, fontWeight: '600'}}>
            Edit Profile
          </Text>
        </Pressable>
        <Box style={styles.infoPages}>
          <FontAwesome5
            name="info-circle"
            style={{color: colors.black, fontSize: 25}}
          />
          <Text style={{color: colors.black, fontSize: 20, fontWeight: '600'}}>
            About Us
          </Text>
        </Box>
        <Box style={styles.infoPages}>
          <MaterialIcons
            name="logout"
            style={{color: colors.black, fontSize: 25}}
          />
          <Text style={{color: colors.black, fontSize: 19, fontWeight: '600'}}>
            Logout
          </Text>
        </Box>
        <ProfileModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          openGallery={openGallery}
          openCamera={openCamera}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  ImageBox: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.grey, // Adjust as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '700',
  },
  editIcon: {
    position: 'absolute',
    left: -10,
    bottom: -10,
    zIndex: 999,
    backgroundColor: colors.black,
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareBox: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  singleBox: {
    width: '40%',
    height: 125,
    borderRadius: 10,
    backgroundColor: colors.black,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  infoPages: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 5,
    width: '100%',
  },
});
