import { createAction } from '@reduxjs/toolkit';

export const loadCards = createAction('data/loadCars', (payload: []) => ({payload}));
export const changePage = createAction('main/changePage', (payload: number) => ({payload}));
export const getCurrentCards = createAction('main/getCurrentCards', (payload: []) => ({payload}));
