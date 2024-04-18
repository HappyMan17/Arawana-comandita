import {
  addDaySummary,
  addPlateToCurrentSummary,
  clearDaySummaries,
  clearSummaryErrorMessage,
  setCurrentSummary,
  setDailyErrorMessage,
  setDailyIsLoading,
} from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { restaurantApi } from "../api";
import { DaySummary, Table } from "../types";
import { deepCopy, duplicateValuesSum } from "../helpers";

export const useDaySummary = () => {
  const {
    currentDaySummary,
    daySummaries,
    errorMessage,
    isLoading,
  } = useAppSelector(state => state.summary);
  const dispatch = useAppDispatch();

  //? Adding table to current summary
  const startAddingToDaySummary = async (table: Table) => {
    dispatch(setDailyIsLoading());
    try {
      const currentSummary = currentDaySummary ?? (await getCurrentSummary());
      let tables: Table[] = deepCopy(currentSummary?.tables);
      let mostBeCreated = true;

      tables = tables.map(currentTable => {
        if (table.id === currentTable.id) {
          mostBeCreated = false;
          table.plates = duplicateValuesSum(table.plates, currentTable.plates);
          return table;
        }
        return currentTable;
      });

      mostBeCreated && tables.push(table);

      dispatch(addPlateToCurrentSummary(tables));

      await restaurantApi.post(
        '/day_summary/add',
        {
          id: currentSummary?.id,
          tables: tables,
        },
      );

    } catch (error) {
      dispatch(setDailyErrorMessage('Error adding to day summary'));
      console.log({ error });
    } finally {
      setTimeout(() => {
        dispatch(clearSummaryErrorMessage());
      }, 100);
    }

  };

  interface Filter {
    init: string;
    end: string;
  }

  //? getting all summaries with filter
  const startGetingDaySummary = async (dateFilter: Filter) => {
    dispatch(setDailyIsLoading());
    try {
      const { data } = await restaurantApi.post(
        '/day_summary/all',
        { filter: dateFilter },
      );

      if (!data || !data.daySummaries) {
        dispatch(setDailyErrorMessage('Error geting day summaries'));
        console.log('error geting day summaries');
      }
      dispatch(clearDaySummaries());

      data.daySummaries.map((summary: DaySummary) => {
        dispatch(addDaySummary(summary));
      });
    } catch (error) {
      dispatch(setDailyErrorMessage('Error geting day sumamries'));
      console.log({ error });
    } finally {
      setTimeout(() => {
        dispatch(clearSummaryErrorMessage());
      }, 100);
    }

  };

  //? getting current summary
  const getCurrentSummary = async () => {
    dispatch(setDailyIsLoading());
    try {
      const { data } = await restaurantApi.get('/day_summary/current');

      // console.log({ data }); // todo remove

      if (!data || !data.summary) {
        dispatch(setDailyErrorMessage('Error geting current summary'));
        console.log('error geting current summaries');
      }
      dispatch(setCurrentSummary(data.summary));

      return data.summary;

    } catch (error) {
      dispatch(setDailyErrorMessage('Error adding to day summary'));
      console.log({ error });
    } finally {
      setTimeout(() => {
        dispatch(clearSummaryErrorMessage());
      }, 100);
    }
  };

  //? getting current summary
  const getSummaryFile = async () => {
    dispatch(setDailyIsLoading());
    try {
      const { data } = await restaurantApi.get('/cvs/update');

      // if an error occurs, create the file
      if (!data.ok) {
        const { data: creationData } = await restaurantApi.get('/cvs/create');
        if (!creationData.ok) {
          dispatch(setDailyErrorMessage('No data created to download yet'));
          return;
        }
      }

      const response = await restaurantApi.get('/cvs', {
        responseType: 'blob'
      });
      await downloadFile(response);

      dispatch(setDailyIsLoading(false));

    } catch (error) {
      dispatch(setDailyErrorMessage('Error adding to day summary'));
    } finally {
      setTimeout(() => {
        dispatch(clearSummaryErrorMessage());
      }, 100);
    }
  };

  const downloadFile = async (response: any) => {
    try {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'summaryData.xlsx'; // Specify the filename here
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      dispatch(setDailyErrorMessage(
        'Something went wrong downloading the file'
      ));
    }
  };

  // todo guess it is not necessary
  // const startRemovingTable = async (tableId: string) => {
  //   dispatch(setDailyIsLoading());
  //   try {
  //     const { data } = await restaurantApi.delete(`/table/delete/${tableId}`);

  //     if (!data || !data.table) {
  //       dispatch(setDailyErrorMessage('Error removing table'));
  //       console.log('error removing table');
  //     }
  //     // dispatch(clearPlates());
  //     // console.log({ dat: data, data: data.plate }); // todo remove

  //     dispatch(removeTable(tableId));

  //   } catch (error) {
  //     dispatch(setDailyErrorMessage('Error removing table'));
  //   } finally {
  //     setTimeout(() => {
  //       dispatch(clearSummaryErrorMessage());
  //     }, 100);
  //   }
  // };

  return {
    currentDaySummary,
    daySummaries,
    errorMessage,
    isLoading,
    //? methods
    startAddingToDaySummary,
    startGetingDaySummary,
    getSummaryFile,
  };
};
