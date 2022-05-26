import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 10000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};

export const api = createAPI();
