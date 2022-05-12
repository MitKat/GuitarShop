import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { rootReducer } from './root-reducers';


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});


