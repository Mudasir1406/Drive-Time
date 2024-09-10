import {PayloadAction} from '@reduxjs/toolkit';
import {UserSliceType} from './slice';

type stateType = UserSliceType;
type actionType = PayloadAction<Partial<UserSliceType>>;

export const setUser = (state: stateType, action: actionType) => {
  const {
    accessToken,
    customerEmail,
    customerName,
    isLoggedIn,
    drawerOpen,
    customerId,
    phoneno,
    userCard,
    type,
  } = action.payload;

  state.accessToken =
    accessToken !== undefined ? accessToken : state.accessToken;
  state.customerEmail =
    customerEmail !== undefined ? customerEmail : state.customerEmail;
  state.customerName =
    customerName !== undefined ? customerName : state.customerName;
  state.isLoggedIn = isLoggedIn !== undefined ? isLoggedIn : state.isLoggedIn;
  state.drawerOpen = drawerOpen !== undefined ? drawerOpen : state.drawerOpen;
  state.customerId = customerId !== undefined ? customerId : state.customerId;
  state.phoneno = phoneno !== undefined ? phoneno : state.phoneno;
  state.userCard = userCard !== undefined ? userCard : state.userCard;
  state.type = type ? type : state.type;
};
