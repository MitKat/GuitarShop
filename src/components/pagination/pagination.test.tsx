import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes} from 'react-router-dom';
import Pagination from './pagination';

describe('Component Pagination', () => {

  it('Should render page 1 correctly', () => {

    const history = createMemoryHistory();
    const route = '/catalog/page_1';
    history.push(route);

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:pageNumber'
            element={<Pagination countPage={3}  />}
          />
        </Routes>
      </Router>,
    );

    expect(screen.getByText(/2/i)).toBeInTheDocument();

    const pagesButtons = screen.getAllByTestId('pagination-page');

    expect(pagesButtons[0]).toHaveClass('pagination__page--active');
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();

  });

  it('Should render page 3 correctly', () => {

    const history = createMemoryHistory();
    const route = '/catalog/page_3';
    history.push(route);

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:pageNumber'
            element={<Pagination countPage={3} />}
          />
        </Routes>
      </Router>,
    );

    const pageLinkElement = screen.getByText(/3/i);
    expect(pageLinkElement).toBeInTheDocument();
    const pagesButtons = screen.getAllByTestId('pagination-page');

    expect(pagesButtons[2]).toHaveClass('pagination__page--active');
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();

  });

});
