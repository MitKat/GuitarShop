import { createReducer } from '@reduxjs/toolkit';
import { InitialProduct } from '../const';
import { changePage, loadCards, loadProduct } from './action';

const initialState = {
  cards: [],
  currentPage: 1,
  product: InitialProduct,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCards, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(changePage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(loadProduct, (state, action) => {
      state.product = action.payload;
    });
});

export {reducer};
