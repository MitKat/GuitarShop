import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

interface InitialState {
  isVisible: boolean,
  isSuccess: boolean,
}

const initialState: InitialState = {
  isVisible: false,
  isSuccess: false,
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
  },
});

export const {
  openModal,
  closeModal,
  openModalSuccess,
} = mainProcess.actions;
