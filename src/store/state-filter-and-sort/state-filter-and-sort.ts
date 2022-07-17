import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';


interface InitialState {
  filtersState: {
    priceStart: number,
    priceEnd: number,
    typeGuitar: string[],
    stringCount: string[],
  },
  sortState: {
    sort: string,
    order: string,
  },
}

const initialState: InitialState = {
  filtersState: {
    priceStart: 0,
    priceEnd: 0,
    typeGuitar: [],
    stringCount: [],
  },
  sortState: {
    sort: '',
    order: '',
  },
};

export const stateFilterAndSort = createSlice({
  name: NameSpace.FiltersAndSort,
  initialState,
  reducers: {
    changeFilterPriceStart: (state, action) => {
      state.filtersState = {
        ...state.filtersState,
        priceStart: action.payload,
      };
    },
    changeFilterPriceEnd: (state, action) => {
      state.filtersState = {
        ...state.filtersState,
        priceEnd: action.payload,
      };
    },
    addFilterType: (state, action) => {
      state.filtersState = {
        ...state.filtersState,
        typeGuitar: state.filtersState.typeGuitar.concat(action.payload),
      };
    },
    deleteFilterType: (state, action) => {
      state.filtersState = {
        ...state.filtersState,
        typeGuitar: state.filtersState.typeGuitar.filter((item) => item !== action.payload),
      };
    },
    addFilterStringCount: (state, action) => {
      state.filtersState = {
        ...state.filtersState,
        stringCount: state.filtersState.stringCount.concat(action.payload),
      };
    },
    deleteFilterStringCount: (state, action) => {
      state.filtersState = {
        ...state.filtersState,
        stringCount: state.filtersState.stringCount.filter((item) => item !== action.payload),
      };
    },
    resetFilter: (state) => {
      state.filtersState = initialState.filtersState;
    },
    changeTypeSort: (state, action) => {
      state.sortState = {
        ...state.sortState,
        sort: action.payload,
      };
    },
    changeOrderSort: (state, action) => {
      state.sortState = {
        ...state.sortState,
        order: action.payload,
      };
    },
  },
});

export const {
  changeFilterPriceStart,
  changeFilterPriceEnd,
  addFilterType,
  deleteFilterType,
  addFilterStringCount,
  deleteFilterStringCount,
  resetFilter,
  changeTypeSort,
  changeOrderSort,
} = stateFilterAndSort.actions;
