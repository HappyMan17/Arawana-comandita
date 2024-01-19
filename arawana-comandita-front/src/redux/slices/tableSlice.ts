import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Table } from '../../types';

export interface TableState {
  isLoading: boolean
  currentTable: Table | null;
  tables: Table[];
  errorMessage: string | null;
}

const initialState: TableState = {
  isLoading: false,
  currentTable: null,
  tables: [],
  errorMessage: '',
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.isLoading = false;
      state.tables.push(action.payload);
    },
    setCurrentTable: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.currentTable = state.tables.find(table =>
        table.id === action.payload,
      ) ?? null;
    },
    clearCurrentTable: (state) => {
      state.isLoading = false;
      state.currentTable = null;
    },
    updateTable: (state, action: PayloadAction<Table>) => {
      state.isLoading = false;
      state.tables = state.tables.map(table => {
        if (action.payload.id === table.id) {
          return action.payload;
        }
        return table;
      });
    },
    removeTable: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.tables = state.tables.filter(table =>
        action.payload !== table.id,
      );
    },
    clearTables: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.tables = [];
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    clearTableErrorMessage: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
});

//Action creators are generated for each case reducer function
export const {
  addTable,
  setCurrentTable,
  clearCurrentTable,
  updateTable,
  removeTable,
  clearTables,
  setErrorMessage: setTableErrorMessage,
  setIsLoading: setIsTableLoading,
  clearTableErrorMessage,
} = tableSlice.actions;

export default tableSlice.reducer;
