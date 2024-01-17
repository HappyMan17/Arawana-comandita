import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  status: 'checking' | 'not-authorized' | 'authorized';
  user: Partial<User>;
  errorMessage: string | null;
}

const initialState: UserState = {
  status: 'checking',
  user: {},
  errorMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<Partial<User>>) => {
      state.status = 'authorized';
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    onLogout: (state, action: PayloadAction<string | null>) => {
      state.status = 'not-authorized';
      state.user = {};
      state.errorMessage = action.payload;
    },
    onChecking: (state) => {
      state.status = 'checking';
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    // loggin: (state, action: PayloadAction<number>) => {
    //   state.isLoggedIn = true;
    // },
  },
});

//Action creators are generated for each case reducer function
export const {
  onLogin,
  onLogout,
  onChecking,
  clearErrorMessage,
} = userSlice.actions;

export default userSlice.reducer;
