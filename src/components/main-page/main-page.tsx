import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, TypeOrder, TypeSort } from '../../const';
import { useAppSelector } from '../../hooks/main';
import { fetchFilteredCardsAction } from '../../store/api-actions';
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
  const {catalogFilteredCards} = useAppSelector(({DATA}) => DATA);
  const {pageNumber} = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  //filter
  const listToRender = (catalogFilteredCards) ? catalogFilteredCards : catalogCards;

  useEffect(() => {
    dispatch(fetchFilteredCardsAction(location.search));
  }, [dispatch, location.search]);

  //sorting
  const typeSort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  useMemo(() => {
    let sortedList = catalogCards;

    if (!typeSort) {
      return sortedList;
    }

    switch (order) {
      case TypeOrder.Asc:
        switch (typeSort) {
          case TypeSort.Price:
            sortedList = [...sortedList].sort((guitarA, guitarB) => (guitarA.price - guitarB.price));
            break;
          case TypeSort.Rating:
            sortedList = [...sortedList].sort((guitarA, guitarB) => (guitarA.rating - guitarB.rating));
            break;
        }
        break;
      case TypeOrder.Desc:
        switch (typeSort) {
          case TypeSort.Price:
            sortedList = [...sortedList].sort((guitarA, guitarB) => (guitarB.price - guitarA.price));
            break;
          case TypeSort.Rating:
            sortedList = [...sortedList].sort((guitarA, guitarB) => (guitarB.rating - guitarA.rating));
            break;
        }
        break;
    }
    return sortedList;
  }, [catalogCards, typeSort, order]);

  const countPage = Math.ceil(listToRender.length/CARDS_PER_PAGE);
  const [cards, setCards] = useState(listToRender.slice(0, CARDS_PER_PAGE));

  useEffect(() => {
    const lastIndex = Number(pageNumber)*CARDS_PER_PAGE;
    const firstIndex = lastIndex - CARDS_PER_PAGE;

    if (urlPage === 'main') {
      setCards(listToRender.slice(0, CARDS_PER_PAGE));
    }
    if (urlPage === 'catalog') {
      setCards(listToRender.slice(firstIndex, lastIndex));
    }

  }, [listToRender, pageNumber, urlPage]);

  return (
    <div className="wrapper">
      <Header isCatalog />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter setSearchParams={setSearchParams}/>
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
