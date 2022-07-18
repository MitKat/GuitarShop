import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createAPI } from '../../services/api';
import FormSearch from './form-search';
import { NameSpace } from '../../const';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';

describe('Component: FormSearch', () => {
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
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <FormSearch />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();

  });
});
