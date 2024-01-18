import { calendarApi } from "../api";
import {
  addPlate,
  clearPlates,
  removePlate,
  setErrorMessage,
  setIsLoading,
  updatePlate,
  setCurrentPlate as addCurrentPlate,
  clearCurrentPlate,
} from "../redux";
import { Plate } from "../types";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const usePlates = () => {
 const {
  currentPlate,
  isLoading,
  errorMessage,
  plates,
} = useAppSelector(state => state.plate);

  const dispatch = useAppDispatch();

  const startCreatingPlate = async (plate: Plate) => {
    dispatch(setIsLoading());
    try {
      const { data } = await calendarApi.post('/plate/create', plate);

      if (!data || !data.plate) {
        dispatch(setErrorMessage('Error creating plate'));
        console.log('error creating plate');
      }

      dispatch(addPlate(data.plate));
    } catch (error) {
        dispatch(setErrorMessage('Error creating plate'));
        console.log({ error });
    }

  };

  const startGetingPlates = async () => {
    dispatch(setIsLoading());
    try {
      const { data } = await calendarApi.get('/plate/all');

      if (!data || !data.plates) {
        dispatch(setErrorMessage('Error geting plate'));
        console.log('error geting plates');
      }
      dispatch(clearPlates());

      data.plates.map((plate: Plate) => {
        dispatch(addPlate(plate));
      });
    } catch (error) {
      dispatch(setErrorMessage('Error geting plate'));
      console.log({ error });
    }

  };

  const startUpdatingPlate = async (plate: Plate) => {
    dispatch(setIsLoading());
    try {
      const { data } = await calendarApi.put('/plate/update', plate );

      if (!data || !data.plate) {
        console.log('error updating plates');
      }

      dispatch(updatePlate(plate));

    } catch (error) {
      dispatch(setErrorMessage('Error updating plate'));
    }

  };

  const startRemovingPlate = async (plateId: string) => {
    dispatch(setIsLoading());
    try {
      const { data } = await calendarApi.delete(`/plate/delete/${plateId}`);

      if (!data || !data.plate) {
        console.log('error updating plates');
      }
      // dispatch(clearPlates());
      // console.log({ dat: data, data: data.plate }); // todo remove

      dispatch(removePlate(plateId));

    } catch (error) {
      dispatch(setErrorMessage('Error removing plate'));
    }

  };

  const setCurrentPlate = async (plateId: string | null) => {
    if (plateId) {
      dispatch(addCurrentPlate(plateId));
    } else {
      dispatch(clearCurrentPlate());
    }
  };

  return {
    //? variables
    plates,
    currentPlate,
    isLoading,
    errorMessage,
    //? methods
    startCreatingPlate,
    startGetingPlates,
    startUpdatingPlate,
    startRemovingPlate,
    setCurrentPlate,
  };
};
