import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Button, ButtonText, Text} from '@gluestack-ui/themed';
import {GuideContent} from '../../components';
import {colors} from '../../constant';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';

type guideScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'guide'
>;

type props = {
  navigation: guideScreenNavigationProps;
};

const Guide: React.FC<props> = ({navigation}) => {
  const content = {
    heading: 'Navigation',
    tagLine: "Don't worry about getting lost",
  };

  const handleNavigate = (name: string) => {
    if (name === 'skip') {
      navigation.navigate('LoginType');
    } else {
      navigation.navigate('guideSecond');
    }
  };
  return (
    <Box sx={styles.main}>
      <GuideContent heading={content.heading} tagLine={content.tagLine} />
      <Box sx={styles.btnBox}>
        <Button
          size="md"
          variant="solid"
          isDisabled={false}
          isFocusVisible={true}
          sx={styles.btn}
          onPress={() => {
            handleNavigate('skip');
          }}>
          <ButtonText sx={styles.btnText}>SKIP </ButtonText>
        </Button>
        <Button
          size="md"
          variant="solid"
          isDisabled={false}
          isFocusVisible={false}
          sx={styles.btn}
          onPress={() => {
            handleNavigate('next');
          }}>
          <ButtonText sx={styles.btnText}>NEXT </ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default Guide;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  btnBox: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: colors.transparent,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
  },
  btnText: {
    color: colors.black,
  },
});
