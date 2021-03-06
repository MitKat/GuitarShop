import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import ModalFeedback from './modal-feedback';


describe('component: ModalFeedback', () => {
  it('Should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ModalFeedback productName='Guitar' productId={1} />
      </Router>,
    );

    expect(screen.getByText(/Guitar/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();

    const buttonElement = screen.getByText(/Отправить отзыв/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(screen.getByText(/Отправить отзыв/i));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
