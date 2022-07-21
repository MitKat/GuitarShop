import { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/main';
import { fetchCommentsAction } from '../../store/api-actions';
import { onClickGuitar } from '../../store/guitars/guitars';
import { openModalAddInCart } from '../../store/modals/modals';
import { Card } from '../../types/card';
import Rating from '../rating/rating';

type ProductCardProps = {
    card: Card,
}

function ProductCard({card}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {comments} = useAppSelector(({GUITARS}) => GUITARS);
  const {guitarsInCart} = useAppSelector(({GUITARS}) => GUITARS);

  const isGuitarInCart = guitarsInCart?.some((item) => item.guitar.id === card.id);

  useEffect(() => {
    dispatch(fetchCommentsAction(card.id));
  }, [card.id, dispatch]);


  const handleOpenModal = () => {
    dispatch(onClickGuitar(card.id));
    dispatch(openModalAddInCart());
  };

  return (
    <div className="product-card">
      <img src={`${process.env.PUBLIC_URL}/${card.previewImg}`}  width='75' height='190' alt={card.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={card.rating} />
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments[card.id]?.length}</p>
        </div>
        <p className="product-card__title">{card.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${card.price.toLocaleString('ru-RU')} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={generatePath(AppRoute.GuitarPage, {id: String(card.id)})}>Подробнее</Link>
        {isGuitarInCart ?
          <Link className="button button--red-border button--mini button--in-cart" to={AppRoute.CartPage} >В Корзине</Link>
          :
          <button className="button button--red button--mini button--add-to-cart"
            onClick={handleOpenModal}
          >
          Купить
          </button>}
      </div>
    </div>
  );
}

export default ProductCard;
