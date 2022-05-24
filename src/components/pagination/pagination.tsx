/* eslint-disable no-console */
import { useState } from 'react';
import { generatePath, Link, useParams} from 'react-router-dom';
import { AppRoute } from '../../const';

const PAGINATION_START = 1;

type PaginationProps = {
    countPage: number;
}

function Pagination({countPage}: PaginationProps): JSX.Element {
  const {pageNumber} = useParams();

  const [pageActual, setPageActual] = useState(Number(pageNumber) || PAGINATION_START);

  const numbersPage = [];
  for (let i=1; i <= countPage; i++) {
    numbersPage.push(i);
  }

  const prevPage = pageActual-1;
  const nextPage = pageActual+1;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        { pageActual > 1 &&
      <li className='pagination__page pagination__page--next'>
        <Link className="link pagination__page-link"
          to={generatePath(AppRoute.Catalog, {pageNumber: `${prevPage}`})}
          onClick={() => (setPageActual(prevPage))}
        >
          Назад
        </Link>
      </li>}
        {
          numbersPage.map((number) => (
            <li className={pageActual === number ? 'pagination__page pagination__page--active' : 'pagination__page'}
              key={number}
              data-testid='pagination-page'
            >
              <Link className="link pagination__page-link"
                to={generatePath(AppRoute.Catalog, {pageNumber: `${number}`})}
                onClick={() => (setPageActual(number))}
              >
                {number}
              </Link>
            </li>
          ))
        }
        { pageActual !== countPage &&
        <li className='pagination__page pagination__page--next'>
          <Link className="link pagination__page-link"
            to={generatePath(AppRoute.Catalog, {pageNumber: `${nextPage}`})}
            onClick={() => (setPageActual(nextPage))}
          >
            Далее
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
