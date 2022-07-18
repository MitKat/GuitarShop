import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import ModalCartAdd from './modal-cart-add';
import { createAPI } from '../../services/api';
import { NameSpace } from '../../const';
import { mockTestCard, mockTestCards, mockTestComments } from '../mock/mock';


describe('component: ModalCartAdd', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore(middlewares);
  const fakeStore = mockStore({
    [NameSpace.Guitars]: {
      catalogCards: mockTestCards,
      product: mockTestCard,
      isDataLoaded: true,
      comments: {'1': mockTestComments},
      commentsAll: mockTestComments,
      clickGuitarId: 0,
      discount: 0,
      guitarsInCart: {guitar: mockTestCard, quantity: 1},
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
  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();

    render(
      <Provider store={fakeStore}>
        <Router location={history.location} navigator={history}>
          <ModalCartAdd />
        </Router>,
      </Provider>,
    );

    const buttonElement = screen.getByText(/Добавить в корзину/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(screen.getByText(/Добавить в корзину/i));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
