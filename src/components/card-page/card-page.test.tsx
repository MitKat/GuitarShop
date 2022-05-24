import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';
import CardPage from './card-page';

describe('Component: CardPage', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);
  const fakeStore = mockStore({
    [NameSpace.Data]: {
      catalogCards: mockTestCards,
      product: mockTestCard,
      isDataLoaded: true,
      comments:  mockTestComments,
    },
    [NameSpace.Main]: {
      isVisible: false,
      isSuccess: false,
    },
  });

  const handleChangeTab = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <CardPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(`${mockTestCard.name}`)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Добавить в корзину/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Характеристики/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Описание/i})).toBeInTheDocument();

    userEvent.click(screen.getByText(/Характеристики/i));
    expect(handleChangeTab).toBeCalled();
  });
});