import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import CartPage from './cart-page';
import { createMemoryHistory } from 'history';


describe('Component: CartPage', () => {
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
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();
    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <CartPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();

  });
});
