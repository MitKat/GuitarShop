import { createReducer } from '@reduxjs/toolkit';
import { changePage, getCurrentCards, loadCards } from './action';

const initialState = {
  cards: [],
  currentPage: 1,
  currentCards: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCards, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(changePage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(getCurrentCards, (state, action) => {
      state.currentCards = action.payload;
    });
});

export {reducer};
