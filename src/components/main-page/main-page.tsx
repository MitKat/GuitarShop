import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { parse } from 'query-string';
import { CARDS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks/main';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogCards from '../catalog-cards/catalog-cards';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loading from '../loading/loading';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import ModalCartSuccess from '../modal-cart-success/modal-cart-success';
import Pagination from '../pagination/pagination';
import { addFilterStringCount, addFilterType, changeFilterPriceEnd, changeFilterPriceStart, changeOrderSort, changeTypeSort } from '../../store/state-filter-and-sort/state-filter-and-sort';
import { fetchFilteredCardsAction } from '../../store/api-actions';

type MainPageProps = {
  urlPage: 'main' | 'catalog';
};

function MainPage({urlPage}: MainPageProps): JSX.Element {
  const {catalogCards} = useAppSelector(({GUITARS}) => GUITARS);
  const {isDataLoaded} = useAppSelector(({GUITARS}) => GUITARS);

  const {catalogFilteredCards} = useAppSelector(({GUITARS}) => GUITARS);
  const isAddInCart = useAppSelector(({MODAL}) => MODAL.isAddInCart);
  const isAddedSuccess = useAppSelector(({MODAL}) => MODAL.isAddedSuccess);
  const {pageNumber} = useParams();

  //filter
  const {filtersState} = useAppSelector(({FILTERS_AND_SORT}) => FILTERS_AND_SORT);
  const {sortState} = useAppSelector(({FILTERS_AND_SORT}) => FILTERS_AND_SORT);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const parsed = parse(location.search);
    if (parsed._order) {
      dispatch(changeOrderSort(parsed._order));
    }
    if (parsed._sort) {
      dispatch(changeTypeSort(parsed._sort));
    }
    if (parsed.price_gte) {
      dispatch(changeFilterPriceStart(parsed.price_gte));
    }
    if (parsed.price_lte) {
      dispatch(changeFilterPriceEnd(parsed.price_lte));
    }
    if (parsed.type) {
      if (parsed.type.length > 0) {
        Array(parsed.type).forEach((item) => {
          dispatch(addFilterType(item));
        });
      } else {
        dispatch(addFilterType(parsed.type));
      }
    }
    if (parsed.stringCount) {
      if (parsed.stringCount.length > 0) {
        Array(parsed.stringCount).forEach((item) => {
          dispatch(addFilterStringCount(item));
        });
      } else {
        dispatch(addFilterStringCount(parsed.stringCount));
      }
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(fetchFilteredCardsAction({filtersState, sortState}));
  }, [dispatch, filtersState, sortState]);

  const listToRender = (catalogFilteredCards) ? catalogFilteredCards : catalogCards;

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
            <CatalogFilter/>
            <CatalogSort/>
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
      {isAddInCart && <ModalCartAdd />}
      {isAddedSuccess && <ModalCartSuccess />}
    </div>
  );
}

export default MainPage;
