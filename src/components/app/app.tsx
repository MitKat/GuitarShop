import { Route, Routes, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import GuitarPage from '../guitar-page/guitar-page';
import CartPage from '../cart-page/cart-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppSelector } from '../../hooks/main';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { parse } from 'query-string';
import { addFilterStringCount, addFilterType, changeFilterPriceEnd, changeFilterPriceStart, changeOrderSort, changeTypeSort } from '../../store/state-filter-and-sort/state-filter-and-sort';
import { fetchFilteredCardsAction } from '../../store/api-actions';

function App(): JSX.Element {
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
  }, []);

  useEffect(() => {
    dispatch(fetchFilteredCardsAction({filtersState, sortState}));
  }, [dispatch, filtersState, sortState]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage urlPage='main'/>} />
      <Route path={AppRoute.Catalog} element={<MainPage urlPage='catalog' />} />
      <Route path={AppRoute.GuitarPage} element={<GuitarPage />} />
      <Route path={AppRoute.CartPage} element={<CartPage />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
