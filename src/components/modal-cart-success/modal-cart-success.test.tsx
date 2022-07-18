import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import ModalCartsuccess from './modal-cart-success';


describe('component: ModalCartAdd', () => {
  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ModalCartsuccess />
      </Router>,
    );

    const buttonElement = screen.getByText(/Продолжить покупки/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(screen.getByText(/Продолжить покупки/i));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
