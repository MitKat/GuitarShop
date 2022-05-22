import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { APIRoute } from '../const';
import { api } from '../services/api';
import { loadCards, loadComments, loadProduct } from './data-process/data-process';
import { CommentData } from '../types/comment-data';
import { errorHandle } from '../services/error-handle';


export const fetchCardsAction = createAsyncThunk(
  'data/fetchCards',
  async () => {
    try {
      const {data} = await api.get(`${APIRoute.Cards}`);
      store.dispatch(loadCards(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchProductAction = createAsyncThunk(
  'data/fetchProduct',
  async (id: string) => {
    try {
      const {data} = await api.get(`${APIRoute.Cards}/${id}`);
      store.dispatch(loadProduct(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: string) => {
    const {data} = await api.get(`${APIRoute.Cards}/${id}${APIRoute.Comments}`);
    store.dispatch(loadComments({data, id}));
  },
);

export const sendComment = createAsyncThunk(
  'comments/newComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentData) => {
    try {
      const {data} = await api.post(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
      store.dispatch(loadComments({data, guitarId}));
    } catch (error) {
      errorHandle(error);
    }
  },
);
