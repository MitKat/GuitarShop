import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { store } from '../../store';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import CatalogCards from './catalog-cards';

describe('Component: CatalogCards', () => {
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
    [NameSpace.Modal]: {
      isVisible: false,
      isSuccess: false,
    },
  });
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <CatalogCards catalogCards={mockTestCards}  />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
});
