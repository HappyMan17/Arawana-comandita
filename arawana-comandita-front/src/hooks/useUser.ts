import { calendarApi } from "../api";
import {
  RootState,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout
} from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useUser = () => {
  const { status, errorMessage } = useAppSelector((state: RootState) =>
    state.user
  );
  const dispatch = useAppDispatch();

  type LoginObject = {
    email: string;
    password: string;
  }
  const startLogin = async ({ email, password }: LoginObject) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/login', {
        email,
        password,
      });
      // console.log({ data });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(onLogin({ name: data.user.name, email: data.user.email }));

    } catch (error) {
      console.log({ error });
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(null));
  };

  const startChecking = async () => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.get('/auth/verify');
      // console.log({ data });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);
      dispatch(onLogin({ name: data.user.name, email: data.user.email }));

    } catch (error) {
      console.log({ error });
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  return {
    //? variables
    status,
    errorMessage,
    //? methods
    startLogin,
    startLogout,
    startChecking,
  };
};
