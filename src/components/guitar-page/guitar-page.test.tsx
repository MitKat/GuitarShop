import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import GuitarPage from './guitar-page';

describe('Component: GuitarPage', () => {
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
  });

  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();
    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <GuitarPage />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(`${mockTestCard.description}`)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Характеристики/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Описание/i})).toBeInTheDocument();

  });
});


