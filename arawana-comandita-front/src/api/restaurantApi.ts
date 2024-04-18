import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const restaurantApi = axios.create({
  baseURL: VITE_API_URL,
});

restaurantApi.interceptors.request.use(config => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default restaurantApi;
