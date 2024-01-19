import { calendarApi } from "../api";
import {
  RootState,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  setDarkMode
} from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useUser = () => {
  const {
    status,
    errorMessage,
    user,
    darkMode,
  } = useAppSelector((state: RootState) =>
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
      dispatch(onLogin({ name: data.user.name, email, id: data.user.uid }));

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
      dispatch(onLogin({ name: data.user.name, id: data.user.uid }));

    } catch (error) {
      console.log({ error });
      dispatch(onLogout('Invalid credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  const changeDarkMode = async () => {
    if (darkMode === 'dark') {
      dispatch(setDarkMode(''));
      localStorage.setItem('darkMode', '');
    } else {
      dispatch(setDarkMode('dark'));
      localStorage.setItem('darkMode', 'dark');
    }
  };

  return {
    //? variables
    user,
    status,
    errorMessage,
    darkMode,
    //? methods
    startLogin,
    startLogout,
    changeDarkMode,
    startChecking,
  };
};
