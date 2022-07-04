import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcess } from './data-process/data-process';
import { modals } from './modals/modals';
import { stateFilterAndSort } from './state-filter-and-sort/state-filter-and-sort';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Modal]: modals.reducer,
  [NameSpace.State]: stateFilterAndSort.reducer,
});
