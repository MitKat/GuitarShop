import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { guitars } from './guitars/guitars';
import { modals } from './modals/modals';
import { stateFilterAndSort } from './state-filter-and-sort/state-filter-and-sort';

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitars.reducer,
  [NameSpace.Modal]: modals.reducer,
  [NameSpace.FiltersAndSort]: stateFilterAndSort.reducer,
});
