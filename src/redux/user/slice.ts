import {createSlice} from '@reduxjs/toolkit';
import {setUser} from './reducer';
export type CardType = {
  cardNumber: string;
  exp: string;
  cvc: string;
  cardName: string;
};
export type UserSliceType = {
  dob?: string;
  email?: string;
  firstname?: string;
  gender?: string;
  lastname?: string;
  username?: string;
  userType?: string;
  uid?: string;
  isLoggedIn: boolean;
  VehicleNo?: string;
  VehicleType?: string;
  company?: string;
  make?: string;
  registrationNo?: string;
  phone?: string;
  vehicleImages?: [];
  vehicleDocuments?: [];
  license?: [];
  cnic?: [];
  profile?: '';
};

export const userSliceIntialState: UserSliceType = {
  isLoggedIn: false,
  dob: '',
  email: '',
  firstname: '',
  gender: '',
  lastname: '',
  username: '',
  userType: '',
  uid: '',
  vehicleImages: [],
  vehicleDocuments: [],
  license: [],
  cnic: [],
  phone: '',
  VehicleNo: '',
  VehicleType: '',
  company: '',
  make: '',
  registrationNo: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userSliceIntialState,
  reducers: {setUser},
});

export const userActions = userSlice.actions;
