import { createSlice } from '@reduxjs/toolkit';
import { InitialProduct, NameSpace } from '../../const';
import { Card } from '../../types/card';
import { CartGuitar } from '../../types/cartGuitar';
import { Comment } from '../../types/comment';

interface InitialState {
  catalogCards: Card[];
  catalogFilteredCards: Card[];
  guitarsInCart: CartGuitar[];
  product: Card;
  isDataLoaded: boolean;
  comments: {[guitarId: string]: Comment[]};
  clickGuitarId: number,
  discount: number,
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
  discount: 0,
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

      const indexGuitarInCart = state.guitarsInCart.findIndex((item) => item.guitar.id === Number(action.payload.id));

      if (indexGuitarInCart >= 0) {
        state.guitarsInCart[indexGuitarInCart].quantity += 1;
      } else {
        state.guitarsInCart = [
          ...state.guitarsInCart,
          {guitar: action.payload, quantity: 1},
        ];
      }
      localStorage.setItem('guitarsInCart', JSON.stringify(state.guitarsInCart));
    },
    setQuantityGuitar: (state, action) => {
      const indexGuitarInCart = state.guitarsInCart.findIndex((item) => item.guitar.id === action.payload.id);
      state.guitarsInCart[indexGuitarInCart].quantity += action.payload.value;
      localStorage.setItem('guitarsInCart', JSON.stringify(state.guitarsInCart));
    },
    changeQuantityGuitar: (state, action) => {
      const indexGuitarInCart = state.guitarsInCart.findIndex((item) => item.guitar.id === action.payload.id);
      state.guitarsInCart[indexGuitarInCart].quantity = action.payload.value;
      localStorage.setItem('guitarsInCart', JSON.stringify(state.guitarsInCart));
    },
    deleteGuitarFromCart: (state, action) => {
      state.guitarsInCart = [...state.guitarsInCart].filter((item) => item.guitar.id !== action.payload);
      localStorage.setItem('guitarsInCart', JSON.stringify(state.guitarsInCart));
    },
    onClickGuitar: (state, action) => {
      state.clickGuitarId = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
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
  changeQuantityGuitar,
  setQuantityGuitar,
  deleteGuitarFromCart,
  setDiscount,
} = guitars.actions;
