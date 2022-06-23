import React from 'react';
import { URLSearchParamsInit, useLocation } from 'react-router-dom';
import { TypeOrder, TypeSort } from '../../const';

type CatalogSortProps = {
  typeSort: string | null;
  order: string | null;
  setSearchParams: (nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state: any} |
    undefined) => void;
};

function CatalogSort({typeSort, order, setSearchParams}: CatalogSortProps): JSX.Element {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const handleChangeSort = (name: string) => () => {
    params.set('_sort', name);
    params.set('_order', TypeOrder.Asc);
    setSearchParams(params);
  };

  const handleChangeOrder = (name: string) => () => {
    if (typeSort === null) {
      params.set('_sort', TypeSort.Price);
      params.set('_order', name);
      setSearchParams(params);
    }

    switch (typeSort) {
      case TypeSort.Price:
        params.set('_order', name);
        setSearchParams(params);
        break;
      case TypeSort.Rating:
        params.set('_order', name);
        setSearchParams(params);
        break;
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button
          ${(typeSort === TypeSort.Price) ? 'catalog-sort__type-button--active' : ''}`}
        aria-label="по цене"
        onClick={handleChangeSort(TypeSort.Price)}
        >
           по цене
        </button>
        <button className={`catalog-sort__type-button
          ${(typeSort === TypeSort.Rating) ? 'catalog-sort__type-button--active' : ''}`}
        aria-label="по популярности"
        onClick={handleChangeSort(TypeSort.Rating)}
        >
           по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
            ${(order === TypeOrder.Asc ) ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick={handleChangeOrder(TypeOrder.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
            ${(order === TypeOrder.Desc) ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={handleChangeOrder(TypeOrder.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default React.memo(CatalogSort);

