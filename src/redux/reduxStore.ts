import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {userSlice} from './user/slice.ts';

const reduxStore = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
  }),
});
export default reduxStore;
export type StoreDispatch = typeof reduxStore.dispatch;
export type StoreState = ReturnType<typeof reduxStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action
>;
export type AsyncThunkConfig = {
  state: StoreState;
  dispatch: StoreDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};
