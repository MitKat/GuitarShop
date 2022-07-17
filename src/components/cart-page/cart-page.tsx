import React, { InputHTMLAttributes, useState } from 'react';
import { TypeGuitarTranslation } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/main';
import { onClickGuitar } from '../../store/guitars/guitars';
// import { deleteGuitarFromCart } from '../../store/guitars/guitars';
import { openModalDeleteGuitar } from '../../store/modals/modals';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';

function CartPage(): JSX.Element {
  const {guitarsInCart} = useAppSelector(({GUITARS}) => GUITARS);
  const {isDeleteFromCart} = useAppSelector(({MODAL}) => MODAL);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const totalPrice = guitarsInCart.reduce((summ, guitar) => summ += guitar.price, 0);

  const handleDeleteButton = (id: number) => () => {
    dispatch(onClickGuitar(id));
    dispatch(openModalDeleteGuitar());
  };

  const handleChangeQuantity = (evt: InputHTMLAttributes<HTMLInputElement>) => {
    setQuantity(Number(evt.value));

  };

  return (
    <div className="wrapper">
      <Header isCart/>
      {isDeleteFromCart && <ModalCartDelete />}
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs cart/>
          <div className="cart">
            {guitarsInCart.map((guitar) => (

              <div className="cart-item" key={guitar.id}>
                <button className="cart-item__close-button button-cross"
                  type="button" aria-label="Удалить"
                  onClick={handleDeleteButton(guitar.id)}
                >
                  <span className="button-cross__icon"></span>
                  <span className="cart-item__close-button-interactive-area"></span>
                </button>
                <div className="cart-item__image">
                  <img src={`${process.env.PUBLIC_URL}/${guitar?.previewImg}`}
                    width="55" height="130" alt={guitar.name}
                  />
                </div>
                <div className="product-info cart-item__info">
                  <p className="product-info__title">ЭлектроГитара {guitar.name}</p>
                  <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
                  <p className="product-info__info">
                    {TypeGuitarTranslation.get(String(guitar?.type))}, {guitar?.stringCount} струнная
                  </p>
                </div>
                <div className="cart-item__price">{guitar?.price} ₽</div>
                <div className="quantity cart-item__quantity">
                  <button className="quantity__button" aria-label="Уменьшить количество">
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <input className="quantity__input" type="number" placeholder="1"
                    id="2-count" name="2-count" max="99" value={quantity} data-id={guitar?.id}
                    onClick={handleChangeQuantity}
                  />
                  <button className="quantity__button" aria-label="Увеличить количество">
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
                <div className="cart-item__price-total">{guitar?.price} ₽</div>
              </div>
            ))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{totalPrice} ₽</span>
                </p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default React.memo(CartPage);
