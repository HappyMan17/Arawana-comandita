import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DaySummary } from '../../types';

export interface CounterState {
  isLoading: boolean,
  currentDaySummary: DaySummary | null,
  daySummaries: DaySummary[],
  errorMessage: string | null,
}

const initialState: CounterState = {
  isLoading: false,
  currentDaySummary: null,
  daySummaries: [],
  errorMessage: '',
};

export const daySummarySlice = createSlice({
  name: 'daySummary',
  initialState,
  reducers: {
    addDaySummary: (state, action: PayloadAction<DaySummary>) => {
      state.isLoading = false;
      state.daySummaries.push(action.payload);
    },
    setCurrentSummary: (state, action: PayloadAction<DaySummary>) => {
      state.isLoading = false;
      state.currentDaySummary = action.payload;
    },
    clearDaySummaries: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.daySummaries = [];
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    clearSummaryErrorMessage: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
});

//Action creators are generated for each case reducer function
export const {
  addDaySummary,
  setCurrentSummary,
  clearDaySummaries,
  setErrorMessage: setDailyErrorMessage,
  setIsLoading: setDailyIsLoading,
  clearSummaryErrorMessage,
} = daySummarySlice.actions;
