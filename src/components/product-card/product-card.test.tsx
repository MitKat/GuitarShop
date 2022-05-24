import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import ProductCard from './product-card';

describe('Component: ProductCard', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);
  const fakeStore = mockStore({
    [NameSpace.Data]: {
      catalogCards: mockTestCards,
      product: mockTestCard,
      isDataLoaded: true,
      comments: {'1': mockTestComments},
    },
    [NameSpace.Main]: {
      isVisible: false,
      isSuccess: false,
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ProductCard card={mockTestCard} />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(`${mockTestCard.name}`)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Подробнее/i})).toBeInTheDocument();

  });
});