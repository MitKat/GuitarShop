import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CatalogSort from './catalog-sort';


describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <CatalogSort />
      </BrowserRouter>);

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });
});
