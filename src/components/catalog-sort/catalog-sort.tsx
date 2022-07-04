import React from 'react';
import { useDispatch } from 'react-redux';
import { TypeOrder, TypeSort } from '../../const';
import { useAppSelector } from '../../hooks/main';
import { changeOrderSort, changeTypeSort } from '../../store/state-filter-and-sort/state-filter-and-sort';

function CatalogSort(): JSX.Element {
  const {sortState} = useAppSelector(({STATE}) => STATE);
  const dispatch = useDispatch();

  const handleChangeSort = (name: string) => () => {
    dispatch(changeTypeSort(name));
    dispatch(changeOrderSort(TypeOrder.Asc));
  };

  const handleChangeOrder = (name: string) => () => {
    if (sortState.sort === '') {
      dispatch(changeOrderSort(name));
      dispatch(changeTypeSort(TypeSort.Price));
    }

    switch (sortState.sort) {
      case TypeSort.Price:
        dispatch(changeOrderSort(name));
        break;
      case TypeSort.Rating:
        dispatch(changeOrderSort(name));
        break;
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button
          ${(sortState.sort === TypeSort.Price) ? 'catalog-sort__type-button--active' : ''}`}
        aria-label="по цене"
        onClick={handleChangeSort(TypeSort.Price)}
        >
           по цене
        </button>
        <button className={`catalog-sort__type-button
          ${(sortState.sort === TypeSort.Rating) ? 'catalog-sort__type-button--active' : ''}`}
        aria-label="по популярности"
        onClick={handleChangeSort(TypeSort.Rating)}
        >
           по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
            ${(sortState.order === TypeOrder.Asc) ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick={handleChangeOrder(TypeOrder.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
            ${(sortState.order === TypeOrder.Desc) ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={handleChangeOrder(TypeOrder.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default React.memo(CatalogSort);

