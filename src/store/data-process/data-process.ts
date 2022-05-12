import { createSlice } from '@reduxjs/toolkit';
import { InitialProduct, NameSpace } from '../../const';

const initialState = {
  catalogCards: [],
  product: InitialProduct,
  isDataLoaded: false,
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
  },
});

export const {
  loadCards,
  loadProduct,
} = dataProcess.actions;
