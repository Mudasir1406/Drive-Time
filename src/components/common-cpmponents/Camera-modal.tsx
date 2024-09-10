import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../../constant';
type Iprops = {
    modalVisible: boolean;
    setModalVisible: (e: boolean) => void;
    openCamera: () => void;
    openGallery: () => void;
};

const CameraModal: React.FC<Iprops> = ({
    modalVisible,
    setModalVisible,
    openCamera,
    openGallery,
}) => {
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
                    <Text style={styles.textStyle1}>Capture Or Pick</Text>
                    <View style={styles.new}>
                        <Pressable style={styles.pickUpBox} onPress={openCamera}>
                            <Entypo
                                name="camera"
                                style={{ color: colors.white }}
                                size={25}
                            />
                        </Pressable>
                        <Pressable style={styles.pickUpBox} onPress={openGallery}>
                            <SimpleLineIcons
                                name="picture"
                                style={{ color: colors.white }}
                                size={25}
                            />
                        </Pressable>
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

export default CameraModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 30,
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
        width: 80,
        height: 80,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey,
    },
});