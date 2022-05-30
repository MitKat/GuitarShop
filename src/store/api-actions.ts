import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { loadCards, loadComments, loadProduct } from './data-process/data-process';
import { CommentData } from '../types/comment-data';
import { errorHandle } from '../services/error-handle';
import { AppDispatch, State } from '../types/state';


export const fetchCardsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCards',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.Cards}`);
      dispatch(loadCards(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchProductAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchProduct',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.Cards}/${id}`);
      dispatch(loadProduct(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id: number, {dispatch, extra: api}) => {
    const {data} = await api.get(`${APIRoute.Cards}/${id}${APIRoute.Comments}`);
    dispatch(loadComments({id, data}));
  },
);

export const sendComment = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comments/newComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
      dispatch(fetchCommentsAction(guitarId));
    } catch (error) {
      errorHandle(error);
    }
  },
);
