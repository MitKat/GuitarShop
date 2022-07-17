import { createSlice } from '@reduxjs/toolkit';
import { InitialProduct, NameSpace } from '../../const';
import { Card } from '../../types/card';
import { Comment } from '../../types/comment';

interface InitialState {
  catalogCards: Card[];
  catalogFilteredCards: Card[];
  guitarsInCart: Card[];
  product: Card;
  isDataLoaded: boolean;
  comments: {[guitarId: string]: Comment[]};
  clickGuitarId: number,
}

const guitarsInCart = localStorage.getItem('guitarsInCart');

const initialState: InitialState = {
  catalogCards: [],
  catalogFilteredCards: [],
  guitarsInCart: guitarsInCart ? JSON.parse(guitarsInCart) : [],
  product: InitialProduct,
  isDataLoaded: false,
  comments: {},
  clickGuitarId: 0,
};

export const guitars = createSlice({
  name: NameSpace.Guitars,
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
    setGuitarInCart: (state, action) => {
      state.guitarsInCart = [...state.guitarsInCart, action.payload];
      localStorage.setItem('guitarsInCart', JSON.stringify(state.guitarsInCart));
    },
    deleteGuitarFromCart: (state, action) => {
      state.guitarsInCart = [...state.guitarsInCart].filter((item) => item.id !== action.payload);
    },
    onClickGuitar: (state, action) => {
      state.clickGuitarId = action.payload;
    },
  },
});

export const {
  loadCards,
  loadFilteredCards,
  loadProduct,
  loadComments,
  onClickGuitar,
  setGuitarInCart,
  deleteGuitarFromCart,
} = guitars.actions;
