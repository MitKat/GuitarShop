import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

interface InitialState {
  isVisible: boolean,
  isSuccess: boolean,
  minPrice: number,
  maxPrice: number,
  type: [],
  countString: [],
}

const initialState: InitialState = {
  isVisible: false,
  isSuccess: false,
  minPrice: 0,
  maxPrice: 0,
  type: [],
  countString: [],
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    openModal: (state) => {
      state.isVisible = true;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.isSuccess = false;
    },
    openModalSuccess: (state) => {
      state.isSuccess = true;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setTypeGuitar: (state, action) => {
      state.type = action.payload;
    },
    setCountString: (state, action) => {
      state.countString = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  openModalSuccess,
  setMinPrice,
  setMaxPrice,
  setTypeGuitar,
  setCountString,
} = mainProcess.actions;
