import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../constant';
import {Avatar, AvatarImage, Box} from '@gluestack-ui/themed';
import {useSelector} from 'react-redux';
import CustomButton from '../login-types/custom-button';
import {StoreState} from '../../redux/reduxStore';
type Iprops = {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  openCamera: () => void;
  openGallery: () => void;
};

const ProfileModal: React.FC<Iprops> = ({
  modalVisible,
  setModalVisible,
  openCamera,
  openGallery,
}) => {
  const userData = useSelector((state: StoreState) => state.user);
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
              {userData?.firstname && userData?.firstname.charAt(0)}
            </Text>
          </Avatar>
        </Pressable>
      );
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textStyle1}>Profile Image</Text>
          <Box sx={styles.ImageBox}>{renderAvatar()}</Box>
          <View style={styles.new}>
            <CustomButton text=" Open Camera" handlePress={openCamera} />
            <CustomButton text=" Pick From Gallery" handlePress={openGallery} />
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  ImageBox: {
    position: 'relative',
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  new: {
    alignItems: 'center',
    flexDirection: 'column',

    gap: 10,
    marginVertical: 30,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    color: colors.white,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.grey,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle1: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  pickUpBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.grey, // Adjust as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '700',
  },
});
