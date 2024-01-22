import {
  addDaySummary,
  clearDaySummaries,
  clearSummaryErrorMessage,
  setCurrentSummary,
  setDailyErrorMessage,
  setDailyIsLoading,
} from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { calendarApi } from "../api";
import { DaySummary, Table } from "../types";
import { deepCopy } from "../helpers";

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
      const tables = deepCopy(currentSummary?.tables);

      // if it didn't exist, create it
      tables?.push(table);

      await calendarApi.post(
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
      const { data } = await calendarApi.post(
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
      const { data } = await calendarApi.get('/day_summary/current');

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

  // todo guess it is not necessary
  // const startRemovingTable = async (tableId: string) => {
  //   dispatch(setDailyIsLoading());
  //   try {
  //     const { data } = await calendarApi.delete(`/table/delete/${tableId}`);

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
  };
};
