import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Plate, PlateGroup } from '../../types/plateTypes';

export interface PlateState {
  isLoading: boolean;
  currentPlate: Plate | null;
  plates: Plate[];
  plateGroup: PlateGroup[];
  errorMessage: string | null;
}

const initialState: PlateState = {
  isLoading: false,
  currentPlate: null,
  plates: [],
  plateGroup: [],
  errorMessage: null,
};

export const plateSlice = createSlice({
  name: 'plate',
  initialState,
  reducers: {
    addPlate: (state, action: PayloadAction<Plate>) => {
      state.isLoading = false;
      state.plates.push(action.payload);
    },
    setCurrentPlate: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.currentPlate = state.plates.find(plate =>
        plate.id === action.payload,
      ) ?? null;
    },
    clearCurrentPlate: (state) => {
      state.isLoading = false;
      state.currentPlate = null;
    },
    updatePlate: (state, action: PayloadAction<Plate>) => {
      state.isLoading = false;
      state.plates = state.plates.map(plate => {
        if (action.payload.id === plate.id) {
          return action.payload;
        }
        return plate;
      });
    },
    setPlateGroups: (state, action: PayloadAction<PlateGroup[]>) => {
      state.isLoading = false;
      state.plateGroup = action.payload;
    },
    removePlateGroup: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.plateGroup = state.plateGroup.filter(group =>
        group.id !== action.payload,
      );
    },
    removePlate: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.plates = state.plates.filter(plate =>
        action.payload !== plate.id,
      );
    },
    clearPlates: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.plates = [];
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    clearPlateErrorMessage: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    },
    // loggin: (state, action: PayloadAction<number>) => {
    //   state.isLoggedIn = true;
    // },
  },
});

//Action creators are generated for each case reducer function
export const {
  addPlate,
  setCurrentPlate,
  clearCurrentPlate,
  setIsLoading,
  setPlateGroups,
  removePlateGroup,
  updatePlate,
  removePlate,
  clearPlates,
  setErrorMessage,
  clearPlateErrorMessage,
} = plateSlice.actions;
