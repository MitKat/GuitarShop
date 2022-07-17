import { Card } from './types/card';

export const getMinPrice = (guitarList: Card[]) => {
  if(guitarList.length <= 0) {
    return 0;
  }

  let min = guitarList[0].price;

  guitarList.forEach((guitar) => {
    if (guitar.price < min) {
      min = guitar.price;
    }
  });

  return min;
};

export const getMaxPrice = (guitarList: Card[]) => {
  if(guitarList.length <= 0) {
    return 0;
  }

  let max = guitarList[0].price;

  guitarList.forEach((guitar) => {
    if (guitar.price > max) {
      max = guitar.price;
    }
  });

  return max;
};


