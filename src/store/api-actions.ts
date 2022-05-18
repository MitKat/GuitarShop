import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { APIRoute } from '../const';
import { api } from '../services/api';
import { loadCards, loadComments, loadProduct } from './data-process/data-process';
import { CommentData } from '../types/comment-data';


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

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: string) => {
    const {data} = await api.get(`${APIRoute.Cards}/${id}${APIRoute.Comments}`);
    store.dispatch(loadComments(data));
  },
);

export const sendComment = createAsyncThunk(
  'comments/newComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentData) => {
    await api.post(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
    store.dispatch(fetchCommentsAction(String(guitarId)));
  },
);
