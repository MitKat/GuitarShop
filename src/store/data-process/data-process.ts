import { createSlice } from '@reduxjs/toolkit';
import { InitialProduct, NameSpace } from '../../const';
import { Card } from '../../types/card';
import { Comment } from '../../types/comment';

interface InitialState {
  catalogCards: Card[];
  catalogFilteredCards: Card[];
  product: Card;
  isDataLoaded: boolean;
  comments: {[guitarId: string]: Comment[]};
}

const initialState: InitialState = {
  catalogCards: [],
  catalogFilteredCards: [],
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
    loadFilteredCards: (state, action) => {
      state.catalogFilteredCards = action.payload;
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
    filteredPriceMin: (state, action) => {
      state.catalogCards = state.catalogCards.filter((guitar) => guitar.price >= action.payload);
    },
    filteredPriceMax: (state, action) => {
      state.catalogCards = state.catalogCards.filter((guitar) => guitar.price <= action.payload);
    },
  },
});

export const {
  loadCards,
  loadFilteredCards,
  loadProduct,
  loadComments,
  filteredPriceMin,
  filteredPriceMax,
} = dataProcess.actions;
