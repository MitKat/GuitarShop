import { createSlice } from '@reduxjs/toolkit';
import { InitialProduct, NameSpace } from '../../const';

const initialState = {
  catalogCards: [],
  product: InitialProduct,
  isDataLoaded: false,
  comments: [],
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
      state.comments = action.payload;
    },
  },
});

export const {
  loadCards,
  loadProduct,
  loadComments,
} = dataProcess.actions;
