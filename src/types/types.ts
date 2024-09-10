import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  SignUpUser: undefined;
  SignUpDriver: undefined;
  LoginType: undefined;
  guide: undefined;
};
export type guideScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'guide'
>;
