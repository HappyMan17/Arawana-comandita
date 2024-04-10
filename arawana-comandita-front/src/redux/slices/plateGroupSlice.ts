import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlateGroup } from '../../types';

export interface PlateGroupState {
  isLoading: boolean;
  errorMessage: string | null;
  plateGroups: PlateGroup[];
}

const initialState: PlateGroupState = {
  isLoading: false,
  errorMessage: null,
  plateGroups: [],
};

export const plateGroupSlice = createSlice({
  name: 'plateGroup',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<PlateGroup>) => {
      state.isLoading = false;
      state.plateGroups.push(action.payload);
    },
    setGroups: (state, action: PayloadAction<PlateGroup[]>) => {
      state.isLoading = false;
      state.plateGroups = action.payload;
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.plateGroups = state.plateGroups.filter(group =>
        action.payload !== group.id,
      );
    },
    clearGroups: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.plateGroups = [];
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    clearGroupErrorMessage: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
});

//Action creators are generated for each case reducer function
export const {
  addGroup,
  setGroups,
  removeGroup,
  setErrorMessage: setGroupErrorMessage,
  setIsLoading: setIsGroupLoading,
  clearGroupErrorMessage,
} = plateGroupSlice.actions;
