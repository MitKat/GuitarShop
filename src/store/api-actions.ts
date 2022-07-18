import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, ParamsFilter } from '../const';
import { loadCards, loadComments, loadFilteredCards, loadProduct, setDiscount } from './guitars/guitars';
import { CommentData } from '../types/comment-data';
import { errorHandle } from '../services/error-handle';
import { AppDispatch, State } from '../types/state';
import { stringify } from 'query-string';

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

export const fetchFilteredCardsAction = createAsyncThunk<void, any, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilter',
  async ({filtersState, sortState}, {dispatch, extra: api}) => {
    try {
      const minPrice = `${(filtersState.priceStart !== 0) ? `&${ParamsFilter.PriceStart}=${filtersState.priceStart}` : ''}`;
      const maxPrice = `${(filtersState.priceEnd !== 0) ? `&${ParamsFilter.PriceEnd}=${filtersState.priceEnd}` : ''}`;

      const typeGuitar =`${(filtersState.typeGuitar.length !== 0) ? `&${stringify({type: filtersState.typeGuitar})}` : ''}`;
      const countString = `${(filtersState.stringCount.length !== 0) ? `&${stringify({stringCount: filtersState.stringCount})}` : ''}`;
      const typeSort = `${(sortState.sort !== '') ? `&_sort=${sortState.sort}` : ''}`;
      const orderSort = `${(sortState.order !== '') ? `&_order=${sortState.order}` : ''}`;

      const search = `?${minPrice}${maxPrice}${typeGuitar}${countString}${typeSort}${orderSort}`;

      window.history.replaceState(null, '', search);
      const {data} = await api.get(`${APIRoute.Cards}${search}`);
      dispatch(loadFilteredCards(data));
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

export const applyCoupon = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'cart/applyCoupon',
  async (coupon, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post(APIRoute.Coupon, {coupon});
      dispatch(setDiscount(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
