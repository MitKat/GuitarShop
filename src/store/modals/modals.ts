import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

interface InitialState {
  isVisible: boolean,
  isSuccess: boolean,
  isFormSearch: boolean,
}

const initialState: InitialState = {
  isVisible: false,
  isSuccess: false,
  isFormSearch: false,
};

export const modals = createSlice({
  name: NameSpace.Modal,
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
    openFormSearch: (state) => {
      state.isFormSearch = true;
    },
    closeFormSearch: (state) => {
      state.isFormSearch = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openModalSuccess,
  openFormSearch,
  closeFormSearch,
} = modals.actions;
