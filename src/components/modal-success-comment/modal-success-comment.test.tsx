import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import ModalSuccessComment from './modal-success-comment';


describe('component: ModalSuccessComment', () => {
  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ModalSuccessComment />
      </Router>,
    );

    const buttonElement = screen.getByText(/К покупкам!/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(screen.getByText(/К покупкам!/i));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
