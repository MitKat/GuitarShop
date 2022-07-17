import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import GuitarPage from './guitar-page';

describe('Component: CardPage', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);
  const fakeStore = mockStore({
    [NameSpace.Guitars]: {
      catalogCards: mockTestCards,
      product: mockTestCard,
      isDataLoaded: true,
      comments:  {1: mockTestComments},
    },
    [NameSpace.Modal]: {
      isVisible: false,
      isSuccess: false,
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <GuitarPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(`${mockTestCard.description}`)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Добавить в корзину/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Характеристики/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Описание/i})).toBeInTheDocument();

  });
});
