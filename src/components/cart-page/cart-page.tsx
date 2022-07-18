import React, { ChangeEvent, useRef, useState } from 'react';
import { Coupon, TypeGuitarTranslation } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/main';
import { applyCoupon } from '../../store/api-actions';
import { changeQuantityGuitar, onClickGuitar, setDiscount, setQuantityGuitar } from '../../store/guitars/guitars';
import { openModalDeleteGuitar } from '../../store/modals/modals';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';

function CartPage(): JSX.Element {
  const {guitarsInCart} = useAppSelector(({GUITARS}) => GUITARS);
  const {discount} = useAppSelector(({GUITARS}) => GUITARS);
  const {isDeleteFromCart} = useAppSelector(({MODAL}) => MODAL);
  const dispatch = useAppDispatch();

  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const inputCoupon = useRef<HTMLInputElement | null>(null);

  const totalPrice = guitarsInCart?.reduce((summ, {guitar, quantity}) => summ += guitar.price*quantity, 0);
  const bonus = totalPrice*discount/100;
  const payment = totalPrice - bonus;

  const handleDeleteButton = (id: number) => () => {
    dispatch(onClickGuitar(id));
    dispatch(openModalDeleteGuitar());
  };

  const handleChangeQuantity = (id: number) => (evt:ChangeEvent<HTMLInputElement>) => {
    evt.target.value = evt.target.value.replace(/^0/, '');
    let value = Number(evt.target.value);

    if (value > 99) {
      value = 99;
    }
    dispatch(changeQuantityGuitar({id, value}));
  };

  const handleValidValue =(id: number) =>  (evt:ChangeEvent<HTMLInputElement>) => {
    let value = Number(evt.target.value);
    if (value === 0) {
      value = 1;
    }
    dispatch(changeQuantityGuitar({id, value}));
  };

  const handleDecQuantity = (id: number) => () => {
    const value = -1;
    const indexGuitarInCart = guitarsInCart.findIndex((item) => item.guitar.id === id);
    if (guitarsInCart[indexGuitarInCart].quantity === 1) {
      dispatch(onClickGuitar(id));
      dispatch(openModalDeleteGuitar());
    } else {
      dispatch(setQuantityGuitar({id, value}));
    }
  };

  const handleIncQuantity = (id: number) => () => {
    const value = 1;
    dispatch(setQuantityGuitar({id, value}));
  };

  const handleApplyCoupon = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();

    if(inputCoupon.current !== null ) {
      const isValid = inputCoupon.current.value === Coupon.light ||
        inputCoupon.current.value === Coupon.medium || inputCoupon.current.value === Coupon.height;
      if (isValid) {
        setIsValidCoupon(true);
        dispatch(applyCoupon(inputCoupon.current.value));
      } else {
        setIsValidCoupon(false);
        dispatch(setDiscount(0));
      }
    }
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
            {guitarsInCart.map(({guitar, quantity}) => (

              <div className="cart-item" key={guitar?.id}>
                <button className="cart-item__close-button button-cross"
                  type="button" aria-label="Удалить"
                  onClick={handleDeleteButton(guitar?.id)}
                >
                  <span className="button-cross__icon"></span>
                  <span className="cart-item__close-button-interactive-area"></span>
                </button>
                <div className="cart-item__image">
                  <img src={`${process.env.PUBLIC_URL}/${guitar?.previewImg}`}
                    width="55" height="130" alt={guitar?.name}
                  />
                </div>
                <div className="product-info cart-item__info">
                  <p className="product-info__title">{guitar?.type} {guitar?.name}</p>
                  <p className="product-info__info">Артикул: {guitar?.vendorCode}</p>
                  <p className="product-info__info">
                    {TypeGuitarTranslation.get(String(guitar?.type))}, {guitar?.stringCount} струнная
                  </p>
                </div>
                <div className="cart-item__price">{guitar?.price} ₽</div>
                <div className="quantity cart-item__quantity">
                  <button className="quantity__button"
                    aria-label="Уменьшить количество"
                    onClick={handleDecQuantity(guitar?.id)}
                  >
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>

                  </button>
                  <input className="quantity__input" type="number" placeholder={String(quantity)}
                    id="2-count" name="2-count" max={99} pattern="([^0].?|0[^0])" value={quantity}
                    onChange={handleChangeQuantity(guitar?.id)}
                    onBlur={handleValidValue(guitar?.id)}
                  />
                  <button className="quantity__button"
                    aria-label="Увеличить количество"
                    onClick={handleIncQuantity(guitar?.id)}
                  >
                    <svg width="8" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
                <div className="cart-item__price-total">{guitar?.price*quantity} ₽</div>
              </div>
            ))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" ref={inputCoupon}/>
                    {isValidCoupon ?
                      <p className="form-input__message form-input__message--success">Промокод принят</p>
                      :
                      <p className="form-input__message form-input__message--error">неверный промокод</p>}
                  </div>
                  <button className="button button--big coupon__button"
                    onClick={handleApplyCoupon}
                  >
                    Применить
                  </button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{totalPrice} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className="cart__total-value cart__total-value--bonus">- {(discount > 0) ? bonus : 0} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">{payment} ₽</span>
                </p>
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


