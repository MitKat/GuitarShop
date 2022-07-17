import React from 'react';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
    productName?: string;
    cart?: boolean;
}

function Breadcrumbs({productName, cart}: BreadcrumbsProps): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href={AppRoute.Main}>Главная</a>
      </li>
      <li className="breadcrumbs__item">
        <a className="link" href={AppRoute.Main}>Каталог</a>
      </li>
      {
        productName &&
        <li className="breadcrumbs__item">
          <a className="link" href='?#'>{productName}</a>
        </li>
      }
      {
        cart &&
        <li className="breadcrumbs__item">
          <a className="link" href={AppRoute.CartPage}>Корзина</a>
        </li>
      }

    </ul>
  );
}

export default React.memo(Breadcrumbs);
