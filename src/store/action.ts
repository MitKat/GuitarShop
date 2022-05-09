import { createAction } from '@reduxjs/toolkit';
import { Card } from '../types/card';

export const loadCards = createAction('data/loadCars', (payload: []) => ({payload}));
export const changePage = createAction('main/changePage', (payload: number) => ({payload}));
export const loadProduct = createAction('data/loadProduct', (payload: Card) => ({payload}));

