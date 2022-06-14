import React from 'react';
import { URLSearchParamsInit } from 'react-router-dom';

import { TypeOrder, TypeSort } from '../../const';

type CatalogSortProps = {
  typeSort: string | null;
  order: string | null;
  setSearchParams: (nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state?: any; } |
    undefined) => void;
};

function CatalogSort({typeSort, order, setSearchParams}: CatalogSortProps): JSX.Element {


  // eslint-disable-next-line no-console
  console.log(typeSort, order);

  const params = {_sort: '', _order: TypeOrder.Asc};

  const handleChangeSort = (name: string) => () => {
    params._sort = name;
    setSearchParams(params);
  };

  const handleChangeOrder = (name: string) => () => {
    if (typeSort === null) {
      setSearchParams({ _sort: TypeSort.Price, _order: name});
    }

    switch (typeSort) {
      case TypeSort.Price:
        setSearchParams({ _sort: TypeSort.Price, _order: name});
        break;
      case TypeSort.Rating:
        setSearchParams({ _sort: TypeSort.Rating, _order: name});
        break;
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={(typeSort === TypeSort.Price) ?
          'catalog-sort__type-button catalog-sort__type-button--active' :
          'catalog-sort__type-button'}
        aria-label="по цене"
        onClick={handleChangeSort(TypeSort.Price)}
        >
           по цене
        </button>
        <button className={(typeSort === TypeSort.Rating) ?
          'catalog-sort__type-button catalog-sort__type-button--active' :
          'catalog-sort__type-button'}
        aria-label="по популярности"
        onClick={handleChangeSort(TypeSort.Rating)}
        >
           по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={(order === TypeOrder.Asc) ?
            'catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active' :
            'catalog-sort__order-button catalog-sort__order-button--up'}
          aria-label="По возрастанию"
          onClick={handleChangeOrder(TypeOrder.Asc)}
        >
        </button>
        <button
          className={(order === TypeOrder.Desc) ?
            'catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active' :
            'catalog-sort__order-button catalog-sort__order-button--down'}
          aria-label="По убыванию"
          onClick={handleChangeOrder(TypeOrder.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default React.memo(CatalogSort);

