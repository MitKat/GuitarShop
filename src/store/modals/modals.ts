import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

interface InitialState {
  isFeedback: boolean,
  isSuccess: boolean,
  isFormSearch: boolean,
  isAddInCart: boolean,
  isAddedSuccess: boolean,
  isDeleteFromCart: boolean,
}

const initialState: InitialState = {
  isFeedback: false,
  isSuccess: false,
  isFormSearch: false,
  isAddInCart: false,
  isAddedSuccess: false,
  isDeleteFromCart: false,
};

export const modals = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    openModalFeedback: (state) => {
      state.isFeedback = true;
    },
    closeModal: (state) => {
      state.isFeedback = false;
      state.isSuccess = false;
      state.isFormSearch = false;
      state.isAddInCart = false;
      state.isAddedSuccess = false;
      state.isDeleteFromCart = false;
    },
    openModalSuccess: (state) => {
      state.isSuccess = true;
    },
    openFormSearch: (state) => {
      state.isFormSearch = true;
    },
    closeFormSearch: (state) => {
      state.isFormSearch = false;
    },
    openModalAddInCart: (state) => {
      state.isAddInCart = true;
    },
    openModalAddedSucces: (state) => {
      state.isAddedSuccess = true;
    },
    openModalDeleteGuitar: (state) => {
      state.isDeleteFromCart = true;
    },
  },
});

export const {
  openModalFeedback,
  closeModal,
  openModalSuccess,
  openFormSearch,
  closeFormSearch,
  openModalAddInCart,
  openModalAddedSucces,
  openModalDeleteGuitar,
} = modals.actions;
