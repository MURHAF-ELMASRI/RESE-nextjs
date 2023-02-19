import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import pitchReducer from './Pitch/pitchSlice';
import uiReducer from './ui/uiSlice';
import userReducer from './User/UserSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [userReducer.name]: userReducer.reducer,
      [pitchReducer.name]: pitchReducer.reducer,
      [uiReducer.name]: uiReducer.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
