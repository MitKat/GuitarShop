import { createSlice } from '@reduxjs/toolkit';
import { InitialProduct, NameSpace } from '../../const';
import { Card } from '../../types/card';
import { Comment } from '../../types/comment';

interface InitialState {
  catalogCards: Card[];
  product: Card;
  isDataLoaded: boolean;
  comments: {[guitarId: string]: Comment[]};
}

const initialState: InitialState = {
  catalogCards: [],
  product: InitialProduct,
  isDataLoaded: false,
  comments: {},
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadCards: (state, action) => {
      state.catalogCards = action.payload;
      state.isDataLoaded = true;
    },
    loadProduct: (state, action) => {
      state.product = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = {
        ...state.comments,
        [action.payload.id]: action.payload.data,
      };
    },
  },
});

export const {
  loadCards,
  loadProduct,
  loadComments,
} = dataProcess.actions;
