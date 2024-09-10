import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
export const uploadImage = async (
  imageUri: string,
): Promise<string | undefined> => {
  let reference: any;

  reference = storage().ref(`/images/${uuid.v4()}.jpg`);

  try {
    await reference.putFile(imageUri);
    const url = await reference.getDownloadURL();
    return url;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
