import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Card } from '../../types/card';

type ProductCardProps = {
    card: Card,
}

function ProductCard({card}: ProductCardProps): JSX.Element {

  const mouseOverHandler = () => {
    setMouseOver(card.id);
  };
  const mouseOutHandler = () => {
    setMouseOver(-1);
  };

  const [mouseOver, setMouseOver] = useState(-1);

  return (
    <div className="product-card" onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
      <img src={card.previewImg}  width="75" height="190" alt={card.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
        </div>
        <p className="product-card__title">{card.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${card.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={generatePath(AppRoute.CardPage, {id: String(mouseOver)})}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
