export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:pageNumber',
  GuitarPage = '/product/:id',
  CartPage = '/cart',
  NotFound = '/*',
}

export enum APIRoute {
  Cards = '/guitars',
  Comments = '/comments',
  Coupon = '/coupons'
}

export enum NameSpace {
  Modal = 'MODAL',
  Guitars = 'GUITARS',
  FiltersAndSort = 'FILTERS_AND_SORT',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum Scroll {
  NoScrolling = 'hidden',
  Scrolling = 'scroll',
}

export const CARDS_PER_PAGE = 9 as const;
export const NAME_KEY_ESCAPE = 'Escape' as const;
export const NAME_KEY_ENTER = 'Enter' as const;

export const InitialProduct = {
  id: -1,
  name: '',
  vendorCode: '',
  type: '',
  description: '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
} as const;

export const TypeGuitarTranslation = new Map([
  ['acoustic', 'Акустическая гитара'],
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
]);

export const TypeGuitar = {
  acoustic: 'acoustic',
  electric: 'electric',
  ukulele: 'ukulele',
} as const;

export const CountString = {
  count4: '4',
  count6: '6',
  count7: '7',
  count12: '12',
} as const;

export enum ParamsFilter {
  PriceStart = 'price_gte',
  PriceEnd = 'price_lte',
  Type = 'type',
  StringCount = 'stringCount',
}

export enum TypeSort {
  Price = 'price',
  Rating = 'rating',
}

export enum TypeOrder {
  Desc = 'desc',
  Asc = 'asc',
}

export const CouponFalse = [
  {
    name: 'light-333',
    percent: 3,
  },
  {
    name: 'medium-444',
    percent: 4,
  },
  {
    name: 'height-555',
    percent: 5,
  },
] as const;


export enum Coupon {
  light = 'light-333',
  medium = 'medium-444',
  height = 'height-555',
}

export enum Discount {
  default = 0,
  light = 15,
  medium = 25,
  height = 35,
}

