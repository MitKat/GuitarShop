import { useEffect, useMemo, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, TypeOrder, TypeSort } from '../../const';
import { useAppSelector } from '../../hooks/main';
// import { filteredPriceMax} from '../../store/data-process/data-process';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogCards from '../catalog-cards/catalog-cards';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loading from '../loading/loading';
import Pagination from '../pagination/pagination';

type MainPageProps = {
  urlPage: 'main' | 'catalog';
};

function MainPage({urlPage}: MainPageProps): JSX.Element {
  const {catalogCards} = useAppSelector(({DATA}) => DATA);
  const {isDataLoaded} = useAppSelector(({DATA}) => DATA);
  const {pageNumber} = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const typeSort = searchParams.get('_sort');
  const order = searchParams.get('_order');
  const guitarCatalog = useMemo(() => {
    let sort = catalogCards;
    if (!typeSort) {
      return sort;
    }

    switch (order) {
      case TypeOrder.Asc:
        switch (typeSort) {
          case TypeSort.Price:
            sort = [...catalogCards].sort((guitarA, guitarB) => (guitarA.price - guitarB.price));
            break;
          case TypeSort.Rating:
            sort = [...catalogCards].sort((guitarA, guitarB) => (guitarA.rating - guitarB.rating));
            break;
        }
        break;
      case TypeOrder.Desc:
        switch (typeSort) {
          case TypeSort.Price:
            sort = [...catalogCards].sort((guitarA, guitarB) => (guitarB.price - guitarA.price));
            break;
          case TypeSort.Rating:
            sort = [...catalogCards].sort((guitarA, guitarB) => (guitarB.rating - guitarA.rating));
            break;
        }
        break;
    }

    return sort;
  }, [catalogCards, typeSort, order]);

  const countPage = Math.ceil(guitarCatalog.length/CARDS_PER_PAGE);
  const [cards, setCards] = useState(guitarCatalog.slice(0, CARDS_PER_PAGE));

  useEffect(() => {
    const lastIndex = Number(pageNumber)*CARDS_PER_PAGE;
    const firstIndex = lastIndex - CARDS_PER_PAGE;

    if (urlPage === 'main') {
      setCards(guitarCatalog.slice(0, CARDS_PER_PAGE));
    }
    if (urlPage === 'catalog') {
      setCards(guitarCatalog.slice(firstIndex, lastIndex));
    }

  }, [guitarCatalog, pageNumber, urlPage]);

  return (
    <div className="wrapper">
      <Header isCatalog />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter guitarList={guitarCatalog}/>
            <CatalogSort
              typeSort={typeSort} order={order} setSearchParams={setSearchParams}
            />
            {
              isDataLoaded ?
                <>
                  <CatalogCards catalogCards={cards} />
                  <Pagination countPage={countPage} />
                </>
                :
                <Loading />
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
