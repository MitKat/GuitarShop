import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Rating from './rating';


describe('Component Rating', () => {
  it('Should render correctly', () => {
    const mockRating = 2;

    render(
      <BrowserRouter>
        <Rating
          rating={mockRating}
        />
      </BrowserRouter>,
    );

    expect(screen.queryAllByTestId(/icon-full-star/i)).toHaveLength(2);
  });
});
