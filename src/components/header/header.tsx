import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/main';
import FormSearch from '../form-searh/form-search';

type HeaderProps = {
  isCatalog?: boolean;
  isCart?: boolean;
};

function Header({isCatalog, isCart}: HeaderProps): JSX.Element {
  const {guitarsInCart} = useAppSelector(({GUITARS}) => GUITARS);

  const summaQuantityGuitar = guitarsInCart?.reduce((sum, guitar) =>  sum += guitar.quantity, 0);

  return (
    <header className="header" id='header'>
      <div className="container header__wrapper">
        <a className="header__logo logo" href="/">
          <img className="logo__img" width="70" height="70" src={`${process.env.PUBLIC_URL}/img/svg/logo.svg`} alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className={isCatalog ? 'link main-nav__link link--current' : 'link main-nav__link'} href="/">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className={isCart ? 'header__cart-link link--current' : 'header__cart-link'} to={AppRoute.CartPage} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>
          {guitarsInCart?.length > 0 && <span className="header__cart-count">{summaQuantityGuitar}</span>}
        </Link>
      </div>
    </header>
  );
}

export default React.memo(Header);
