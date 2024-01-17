import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean
}

const initialState: UserState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggin: (state) => {
      state.isLoggedIn = true;
    },
    loggout: (state) => {
      state.isLoggedIn = false;
    },
    // loggin: (state, action: PayloadAction<number>) => {
    //   state.isLoggedIn = true;
    // },
  },
});

//Action creators are generated for each case reducer function
export const { loggin, loggout } = userSlice.actions;

export default userSlice.reducer;
