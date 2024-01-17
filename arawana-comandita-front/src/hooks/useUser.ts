import { RootState } from "../redux";
import { loggin, loggout } from "../redux/";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useUser = () => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const loginUser = () => {
    dispatch(loggin());
  };

  const logoutUser = () => {
    dispatch(loggout());
  };

  return {
    isLoggedIn,
    loginUser,
    logoutUser,
  };
};
