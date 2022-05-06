import { createAction } from '@reduxjs/toolkit';

export const loadCards = createAction('data/loadCars', (payload: []) => ({payload}));
