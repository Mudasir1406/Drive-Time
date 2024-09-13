import {PayloadAction} from '@reduxjs/toolkit';
import {UserSliceType} from './slice';

type stateType = UserSliceType;
type actionType = PayloadAction<Partial<UserSliceType>>;

export const setUser = (state: stateType, action: actionType) => {
  const {
    dob,
    email,
    firstname,
    gender,
    lastname,
    username,
    userType,
    isLoggedIn,
    uid,
    VehicleNo,
    VehicleType,
    company,
    license,
    make,
    phone,
    registrationNo,
    vehicleDocuments,
    vehicleImages,
    profile,
  } = action.payload;

  state.dob = dob !== undefined ? dob : state.dob;
  state.email = email !== undefined ? email : state.email;
  state.firstname = firstname !== undefined ? firstname : state.firstname;
  state.isLoggedIn = isLoggedIn !== undefined ? isLoggedIn : state.isLoggedIn;
  state.gender = gender !== undefined ? gender : state.gender;
  state.lastname = lastname !== undefined ? lastname : state.lastname;
  state.uid = uid !== undefined ? uid : state.uid;
  state.username = username !== undefined ? username : state.username;
  state.userType = userType ? userType : state.userType;
  state.profile = profile ? profile : state.profile;
  state.phone = phone ? phone : state.phone;
  state.VehicleNo = VehicleNo ? VehicleNo : state.VehicleNo;
  state.VehicleType = VehicleType ? VehicleType : state.VehicleType;
  state.company = company ? company : state.company;
  state.make = make ? make : state.make;
  state.registrationNo = registrationNo ? registrationNo : state.registrationNo;
  state.license = license ? license : state.license;
  state.vehicleDocuments = vehicleDocuments
    ? vehicleDocuments
    : state.vehicleDocuments;
  state.vehicleImages = vehicleImages ? vehicleImages : state.vehicleImages;
};
