import { calendarApi } from "../api";
import {
  addTable,
  clearTables,
  removeTable,
  setIsTableLoading,
  setTableErrorMessage,
  updateTable,
  setCurrentTable as addCurrentTable,
  clearCurrentTable,
} from "../redux";
import { Table } from "../types";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useTable = () => {
  const {
    currentTable,
    errorMessage,
    isLoading,
    tables,
  } = useAppSelector(state => state.table);
  const dispatch = useAppDispatch();

  const startCreatingTable = async (table: Table) => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await calendarApi.post('/table/create', table);

      if (!data || !data.table) {
        dispatch(setTableErrorMessage('Error creating table'));
        console.log('error creating table');
      }

      dispatch(addTable(data.table));
    } catch (error) {
        dispatch(setTableErrorMessage('Error creating table'));
        console.log({ error });
    }

  };

  const startGetingTables = async () => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await calendarApi.get('/table/all');

      if (!data || !data.tables) {
        dispatch(setTableErrorMessage('Error geting table'));
        console.log('error geting tables');
      }
      dispatch(clearTables());

      data.tables.map((table: Table) => {
        dispatch(addTable(table));
      });
    } catch (error) {
      dispatch(setTableErrorMessage('Error geting tables'));
      console.log({ error });
    }

  };

  const startUpdatingTable = async (table: Table) => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await calendarApi.put('/table/update', table );

      if (!data || !data.table) {
        console.log('error updating tables');
      }

      dispatch(updateTable(table));

    } catch (error) {
      dispatch(setTableErrorMessage('Error updating table'));
    }

  };

  const startRemovingTable = async (tableId: string) => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await calendarApi.delete(`/table/delete/${tableId}`);

      if (!data || !data.table) {
        console.log('error updating plates');
      }
      // dispatch(clearPlates());
      // console.log({ dat: data, data: data.plate }); // todo remove

      dispatch(removeTable(tableId));

    } catch (error) {
      dispatch(setTableErrorMessage('Error removing table'));
    }

  };

  const setCurrentTable = async (tableId: string | null) => {
    if (tableId) {
      dispatch(addCurrentTable(tableId));
    } else {
      dispatch(clearCurrentTable());
    }
  };

  return {
    //? variables
    currentTable,
    errorMessage,
    isLoading,
    tables,
    //? methods
    startCreatingTable,
    startGetingTables,
    startUpdatingTable,
    startRemovingTable,
    setCurrentTable,
  };
};
