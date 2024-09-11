import {createSlice} from '@reduxjs/toolkit';
import {setUser} from './reducer';
export type CardType = {
  cardNumber: string;
  exp: string;
  cvc: string;
  cardName: string;
};
export type UserSliceType = {
  accessToken?: string;
  customerEmail?: string;
  customerName?: string;
  isLoggedIn?: boolean;
  drawerOpen?: boolean;
  customerId?: string;
  phoneno?: string;
  userCard?: CardType | undefined;
  type?: string;
};

export const userSliceIntialState: UserSliceType = {
  accessToken: '',
  customerEmail: '',
  customerName: '',
  isLoggedIn: false,
  drawerOpen: false,
  customerId: '',
  phoneno: '',
  userCard: undefined,
  type: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userSliceIntialState,
  reducers: {setUser},
});

export const userActions = userSlice.actions;
