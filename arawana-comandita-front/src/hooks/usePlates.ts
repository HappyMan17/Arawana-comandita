import { restaurantApi } from "../api";
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
      console.log({ plate });
      const { data } = await restaurantApi.post('/plate/create', plate);

      if (!data || !data.plate) {
        dispatch(setErrorMessage('Error creating plate'));
        console.log('error creating plate');
        return;
      }

      dispatch(addPlate(data.plate));
    } catch (error) {
      dispatch(setErrorMessage('Error creating plate catch'));
      console.log({ error });
    }

  };

  const startGetingPlates = async () => {
    dispatch(setIsLoading());
    try {
      const { data } = await restaurantApi.get('/plate/all');

      if (!data || !data.plates) {
        dispatch(setErrorMessage('Error geting plate'));
        console.log('error geting plates');
        return;
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
      const { data } = await restaurantApi.put('/plate/update', plate );

      if (!data || !data.plate) {
        console.log('error updating plates');
        return;
      }

      dispatch(updatePlate(plate));

    } catch (error) {
      dispatch(setErrorMessage('Error updating plate'));
    }

  };

  const startRemovingPlate = async (plateId: string) => {
    dispatch(setIsLoading());
    try {
      const { data } = await restaurantApi.delete(`/plate/delete/${plateId}`);

      if (!data || !data.plate) {
        console.log('error updating plates');
        return;
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
