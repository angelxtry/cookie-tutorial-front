/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

export interface UserInfo {
  email: string;
  password: string;
  name: string;
  message: string;
}

export interface userState {
  isLoading: boolean;
  isLoggedIn: boolean;
  loginInfo: {
    message: string;
    token: string;
  };
  userInfo: UserInfo;
  error: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const initialState: userState = {
  isLoading: false,
  isLoggedIn: false,
  loginInfo: {
    message: '',
    token: '',
  },
  userInfo: {
    email: '',
    password: '',
    name: '',
    message: '',
  },
  error: '',
};

const name = 'LOGIN';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    requestLogin: {
      reducer(state) {
        state.isLoading = true;
      },
      prepare(email: string, password: string) {
        return { payload: { email, password } };
      },
    },
    requestMe: state => {
      state.isLoading = true;
      state.isLoggedIn = false;
    },
    successMe: (state, { payload }: { payload: UserInfo }) => {
      console.log('SUCESS ME: ', payload);
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userInfo = payload;
    },
  },
});

const selectLoginInfo = createSelector(
  (state: userState) => state.loginInfo,
  loginInfo => loginInfo
);

const selectUserInfo = createSelector(
  (state: userState) => ({ userInfo: state.userInfo, isLoggedIn: state.isLoggedIn }),
  ({ userInfo, isLoggedIn }) => ({ userInfo, isLoggedIn })
);

export const LOGIN = slice.name;

export const loginSelector = {
  getLoginInfo: (state: RootState): LoginResponse => selectLoginInfo(state.LOGIN),
  getUserInfo: (state: RootState) => selectUserInfo(state.LOGIN),
};

export const unsplashReducer = slice.reducer;
export const loginActions = slice.actions;
