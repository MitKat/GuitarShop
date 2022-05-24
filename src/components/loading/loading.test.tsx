import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Loading from './loading';


describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Loading />
      </BrowserRouter>);

    expect(screen.getByText(/Подождите, данные загружаются/i)).toBeInTheDocument();
  });
});
