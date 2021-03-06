import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import { NameSpace } from '../../const';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import CatalogFilter from './catalog-filter';


describe('Component: CatalogFilter', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);
  const fakeStore = mockStore({
    [NameSpace.Guitars]: {
      catalogCards: mockTestCards,
      product: mockTestCard,
      isDataLoaded: true,
      comments: {'1': mockTestComments},
      catalogFilteredCards: mockTestCards,
      guitarsInCart: [{guitar: mockTestCard, quantity: 1}],
      clickGuitarId: 0,
      discount: 0,
    },
    [NameSpace.Modal]: {
      isVisible: false,
      isSuccess: false,
    },
    [NameSpace.FiltersAndSort]: {
      filtersState: {
        priceStart: 0,
        priceEnd: 0,
        typeGuitar: [],
        stringCount: [],
      },
      sortState: {
        sort: 'price',
        order: 'asc',
      },
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <CatalogFilter/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Акустическая гитара/i)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитара/i)).toBeInTheDocument();
    expect(screen.getByText(/укулеле/i)).toBeInTheDocument();
    expect(screen.getByText(/количество струн/i)).toBeInTheDocument();
  });
});
