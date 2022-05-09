import { generatePath, Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/main';
import { changePage } from '../../store/action';

type PaginationProps = {
    countPage: number;
    currentPage: number;
}

function Pagination({countPage, currentPage}: PaginationProps): JSX.Element {
  // const {pageNumber} = useParams();
  const dispatch = useAppDispatch();
  const numbersPage = [];

  for (let i=1; i <= countPage; i++) {
    numbersPage.push(i);
  }

  const prevPage = currentPage-1;
  const nextPage = currentPage+1;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        { currentPage > 1 &&
        <li className='pagination__page pagination__page--next'>
          <Link className="link pagination__page-link"
            to={generatePath(AppRoute.Catalog, {pageNumber: `page_${currentPage}`})}
            onClick={() => dispatch(changePage(prevPage))}
          >
            Назад
          </Link>
        </li>}
        {
          numbersPage.map((number) => (
            <li className={currentPage === number ? 'pagination__page pagination__page--active' : 'pagination__page'} key={number}>
              <Link className="link pagination__page-link"
                to={generatePath(AppRoute.Catalog, {pageNumber: `page_${number}`})}
                onClick={() => dispatch(changePage(number))}
              >
                {number}
              </Link>
            </li>
          ))
        }
        { currentPage !== countPage &&
        <li className='pagination__page pagination__page--next'>
          <Link className="link pagination__page-link"
            to={generatePath(AppRoute.Catalog, {pageNumber: `page_${currentPage}`})}
            onClick={() => dispatch(changePage(nextPage))}
          >
            Далее
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
