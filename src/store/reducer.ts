import { createReducer } from '@reduxjs/toolkit';
import { loadCards } from './action';

const initialState = {
  cards: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCards, (state, action) => {
      state.cards = action.payload;
    });
});

export {reducer};
