import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { APIRoute } from '../const';
import { api } from '../services/api';
import { loadCards, loadProduct } from './action';

export const fetchCardsAction = createAsyncThunk(
  'data/fetchCards',
  async () => {
    const {data} = await api.get(`${APIRoute.Cards}`);
    store.dispatch(loadCards(data));
  },
);

export const fetchProductAction = createAsyncThunk(
  'data/fetchProduct',
  async (id: string) => {
    const {data} = await api.get(`${APIRoute.Cards}/${id}`);
    store.dispatch(loadProduct(data));
  },
);

