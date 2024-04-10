import { restaurantApi } from "../api";
import {
  setGroupErrorMessage,
  setIsGroupLoading,
  addGroup,
  setGroups,
  removeGroup
} from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const usePlateGroup = () => {
  const {
    errorMessage,
    isLoading,
    plateGroups,
  } = useAppSelector(state => state.plateGroup);

  const dispatch = useAppDispatch();

  const startCreatingPlateGroup = async (name: string) => {
    dispatch(setIsGroupLoading());
    try {
      const { data } = await restaurantApi.post('/plate_group/create', {
        name,
      });

      if (!data || !data.group) {
        dispatch(setGroupErrorMessage('Error creating group'));
        console.log('error creating group');
        return;
      }

      dispatch(addGroup(data.group));
    } catch (error) {
      dispatch(setGroupErrorMessage('Error creating group'));
      console.log({ error });
    }
  };

  const startGettingPlateGroups = async () => {
    dispatch(setIsGroupLoading());
    try {
      const { data } = await restaurantApi.get('/plate_group/all');

      if (!data || !data.groups) {
        dispatch(setGroupErrorMessage('Error getting groups'));
        console.log('error getting groups');
        return;
      }

      dispatch(setGroups(data.groups));
    } catch (error) {
      dispatch(setGroupErrorMessage('Error getting groups catch'));
      console.log({ error });
    }
  };

  const startRemovingPlateGroups = async (groupId: string) => {
    dispatch(setIsGroupLoading());
    try {
      const { data } = await restaurantApi.delete(
        '/plate_group/delete/' + groupId
      );

      if (!data || !data.group) {
        dispatch(setGroupErrorMessage('Error delete group'));
        console.log('error delete group');
        return;
      }

      dispatch(removeGroup(data.group.id));
    } catch (error) {
      dispatch(setGroupErrorMessage('Error delete group catch'));
      console.log({ error });
    }
  };

  return {
    // variables
    errorMessage,
    isLoading,
    plateGroups,
    // methods
    startGettingPlateGroups,
    startCreatingPlateGroup,
    startRemovingPlateGroups,
  };

};
