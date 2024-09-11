import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  SignUpUser: undefined;
  SignUpDriver: undefined;
  LoginType: undefined;
  guide: undefined;
};

export type LoginTypeNavigation = StackNavigationProp<
  AuthStackParamList,
  'LoginType'
>;
export type loginScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export type guideScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'guide'
>;

export type RootBottomTabParams = {
  Home: undefined;
  Profile: undefined;
};

export type UserStackParamList = {
  BottomTab: NavigatorScreenParams<RootBottomTabParams>;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Home'>,
  NativeStackScreenProps<UserStackParamList>
>;
export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Profile'>,
  NativeStackScreenProps<UserStackParamList>
>;
