import { Card } from './types/card';

export const getMinPrice = (guitarList: Card[]) => guitarList?.reduce((min, guitar) => guitar.price < min ? guitar.price : min, guitarList[0]?.price);
export const getMaxPrice = (guitarList: Card[]) => guitarList?.reduce((max, guitar) => guitar.price > max ? guitar.price : max, guitarList[0]?.price);
