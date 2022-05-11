import { AppRoute } from '../../const';

type BreadcrumbsProps = {
    productName?: string;
}

function Breadcrumbs({productName}: BreadcrumbsProps): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href={AppRoute.Main}>Главная</a>
      </li>
      <li className="breadcrumbs__item">
        <a className="link" href={AppRoute.Catalog}>Каталог</a>
      </li>
      {
        productName &&
        <li className="breadcrumbs__item">
          <a className="link" href='?#'>{productName}</a>
        </li>
      }
    </ul>
  );
}

export default Breadcrumbs;
