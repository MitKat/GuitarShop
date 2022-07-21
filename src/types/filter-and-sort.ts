export type FilterAndSort = {
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
};
