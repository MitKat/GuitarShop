import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy/guitars?_limit=27';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};

export const api = createAPI();
