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
  forgetPassword: undefined;
};

export type LoginTypeNavigation = NativeStackScreenProps<
  AuthStackParamList,
  'LoginType'
>;
export type loginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;

export type guideScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'guide'
>;

export type signupUserScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'SignUpUser'
>;

export type signupdriverScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'SignUpDriver'
>;

export type RootBottomTabParams = {
  Home: undefined;
  Profile: undefined;
};
export type RootBottomTabParamsDriver = {
  Home: undefined;
  Profile: undefined;
};

export type UserStackParamList = {
  BottomTab: NavigatorScreenParams<RootBottomTabParams>;
};
export type DriverStackParamList = {
  BottomTab: NavigatorScreenParams<RootBottomTabParamsDriver>;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Home'>,
  NativeStackScreenProps<UserStackParamList>
>;
export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Profile'>,
  NativeStackScreenProps<UserStackParamList>
>;
