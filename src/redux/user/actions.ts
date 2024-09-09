import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '../reduxStore';
import _ from 'lodash';
import {UserSliceType, userActions} from './slice';
const UserThunks = {
  addUser: 'user/addUser',
};

export const addUser = createAsyncThunk<
  string,
  {user: UserSliceType},
  AsyncThunkConfig
>(UserThunks.addUser, async ({user}, {dispatch, getState}) => {
  const message = 'added';
  const userData = getState().user;

  return message;
});
