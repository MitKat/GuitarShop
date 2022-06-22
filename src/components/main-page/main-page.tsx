import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
// import { query-string } from 'query-string';
import { CARDS_PER_PAGE, TypeOrder, TypeSort } from '../../const';
import { useAppSelector } from '../../hooks/main';
import { fetchFilteredCardsAction } from '../../store/api-actions';
// import { Card } from '../../types/card';
import { getMaxPrice, getMinPrice } from '../../utils';
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
  const dispatch = useDispatch();
  const {catalogFilteredCards} = useAppSelector(({DATA}) => DATA);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  //filter
  const minPrice = getMinPrice(catalogCards);
  const maxPrice = getMaxPrice(catalogCards);

  // eslint-disable-next-line no-console
  console.log(location.search);

  useEffect(() => {

    dispatch(fetchFilteredCardsAction(location.search));
    // eslint-disable-next-line no-console
    console.log('gjckt', catalogFilteredCards);
  }, [dispatch, location.search]);

  // const listToRender: Card[] = catalogCards;
  // const listToRender2 = useMemo(() => {
  //   const listOfPrice = listToRender;
  //   if (priceStart) {
  //     listOfPrice.filter((item) => item.price >= Number(priceStart));
  //   }
  //   if (priceEnd) {
  //     listOfPrice.filter((item) => item.price <= Number(priceEnd));
  //   }
  //   return listOfPrice;

  // }, [listToRender, priceEnd, priceStart]);

  // // eslint-disable-next-line no-console
  // console.log(listToRender2);

  // listToRender = useMemo(() => {let listOfTypes = listToRender;
  //   let filteredTypesAcoustic: Card[] = [];
  //   let filteredTypesUkulele: Card[] = [];
  //   let filteredTypesElectric: Card[] = [];

  //   if (typesGuitar.length) {

  //     if (typesGuitar.some((item) => item === 'acoustic')) { filteredTypesAcoustic = listOfTypes.filter((item) => item.type === 'acoustic');}
  //     if (typesGuitar.some((item) => item === 'ukulele')) {filteredTypesUkulele = listOfTypes.filter((item) => item.type === 'ukulele');}
  //     if (typesGuitar.some((item) => item === 'electric')) {filteredTypesElectric = listOfTypes.filter((item) => item.type === 'electric');}

  //   }

  //   return listOfTypes = filteredTypesAcoustic.concat( filteredTypesUkulele, filteredTypesElectric);
  // }, [listToRender, typesGuitar]);

  // eslint-disable-next-line no-console
  // console.log(listToRender);

  //sorting
  const typeSort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  const guitarListSort = useMemo(() => {
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

  // eslint-disable-next-line no-console
  console.log(guitarListSort);

  const countPage = Math.ceil(guitarListSort.length/CARDS_PER_PAGE);
  const [cards, setCards] = useState(guitarListSort.slice(0, CARDS_PER_PAGE));

  useEffect(() => {
    const lastIndex = Number(pageNumber)*CARDS_PER_PAGE;
    const firstIndex = lastIndex - CARDS_PER_PAGE;

    if (urlPage === 'main') {
      setCards(guitarListSort.slice(0, CARDS_PER_PAGE));
    }
    if (urlPage === 'catalog') {
      setCards(guitarListSort.slice(firstIndex, lastIndex));
    }

  }, [guitarListSort, pageNumber, urlPage]);

  return (
    <div className="wrapper">
      <Header isCatalog />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} setSearchParams={setSearchParams}/>
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
