export enum AppRoute {
  Main = '/',
  Catalog = '/#catalog/:pageNumber',
  CardPage = '/product/:id',
  NotFound = '/*',
}

export enum APIRoute {
  Cards = '/guitars',
}

export const CARDS_PER_PAGE = 9;

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
};

export const TypeGuitarTranslation = new Map([
  ['acoustic', 'Акустическая гитара'],
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
]);

