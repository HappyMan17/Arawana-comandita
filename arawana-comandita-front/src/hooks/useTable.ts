import { restaurantApi } from "../api";
import {
  addTable,
  clearTables,
  removeTable,
  setIsTableLoading,
  setTableErrorMessage,
  updateTable,
  setCurrentTable as addCurrentTable,
  clearCurrentTable,
  clearTableErrorMessage,
} from "../redux";
import { Table, TablePlateObject } from "../types";
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
      const { data } = await restaurantApi.post('/table/create', table);

      if (!data || !data.table) {
        dispatch(setTableErrorMessage('Error creating table'));
        console.log('error creating table');
      }

      dispatch(addTable(data.table));
    } catch (error) {
      dispatch(setTableErrorMessage('Error creating table'));
      console.log({ error });
    } finally {
      setTimeout(() => {
        dispatch(clearTableErrorMessage());
      }, 100);
    }

  };

  const startGetingTables = async () => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await restaurantApi.get('/table/all');

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
    } finally {
      setTimeout(() => {
        dispatch(clearTableErrorMessage());
      }, 100);
    }

  };

  const startUpdatingTable = async (table: Table) => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await restaurantApi.put('/table/update', table );

      if (!data || !data.table) {
        dispatch(setTableErrorMessage('Error updating table'));
        console.log('error updating tables');
      }

      dispatch(updateTable(table));

    } catch (error) {
      dispatch(setTableErrorMessage('Error updating table'));
    } finally {
      setTimeout(() => {
        dispatch(clearTableErrorMessage());
      }, 100);
    }

  };

  const startRemovingTable = async (tableId: string) => {
    dispatch(setIsTableLoading());
    try {
      const { data } = await restaurantApi.delete(`/table/delete/${tableId}`);

      if (!data || !data.table) {
        dispatch(setTableErrorMessage('Error removing table'));
        console.log('error removing table');
      }
      // dispatch(clearPlates());
      // console.log({ dat: data, data: data.plate }); // todo remove

      dispatch(removeTable(tableId));

    } catch (error) {
      dispatch(setTableErrorMessage('Error removing table'));
    } finally {
      setTimeout(() => {
        dispatch(clearTableErrorMessage());
      }, 100);
    }

  };

  const setCurrentTable = async (tableId: string | null) => {
    if (tableId) {
      dispatch(addCurrentTable(tableId));
    } else {
      dispatch(clearCurrentTable());
    }
  };

  const startUpdatingTablePlates = async (object: TablePlateObject) => {
    dispatch(setIsTableLoading());
    try {
      if (!currentTable) {
        dispatch(setTableErrorMessage('Error geting table to update'));
        throw new Error('No current table to update');
      }

      const modifyTable = {
        ...currentTable,
        plates: object.selectedPlates,
      };

      const { data } = await restaurantApi.put('/table/update', modifyTable );

      if (!data || !data.table) {
        dispatch(setTableErrorMessage('Data error, updating table'));
        console.log('error updating tables');
      }

      dispatch(updateTable(modifyTable));

    } catch (error) {
      dispatch(setTableErrorMessage('Error updating table'));
    } finally {
      setTimeout(() => {
        dispatch(clearTableErrorMessage());
      }, 100);
    }
  };

  const findTablePlate = (plateId: string) => {
    // console.log({currentTable})
    if (!currentTable) {
      return null;
    }
    const plate = currentTable.plates.find(plate => {
      return plate.id === plateId;
    });

    if (!plate) {
      return null;
    }
    return JSON.parse(JSON.stringify(plate)) ?? null;
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
    startUpdatingTablePlates,
    findTablePlate,
    setCurrentTable,
  };
};
