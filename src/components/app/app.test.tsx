import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import App from './app';

describe('Component App', () => {
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
      isFeedback: false,
      isSuccess: false,
      isFormSearch: false,
      isAddInCart: false,
      isAddedSuccess: false,
      isDeleteFromCart: false,
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

  const history = createBrowserHistory();

  const fakeApp = (
    <Provider store={fakeStore}>
      <Router location={history.location} navigator={history}>
        <App/>
      </Router>
    </Provider>
  );


  it('should render MainPage when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render MainPage when user navigate to "/catalog/page_pageNumber"', () => {
    history.push('/catalog/page_2');
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render GuitarPage when user navigate to "/product/id"', () => {
    history.push(`/product/${mockTestCard.id}`);
    render(fakeApp);

    expect(screen.getByText(`${mockTestCard.name}`)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to "/*"', () => {

    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={['/non-page']}>
          <App/>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Вернуться на главную страницу/i)).toBeInTheDocument();
  });
});
