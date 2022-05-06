import { Card } from '../../types/card';

type ProductCardProps = {
    card: Card,
}

function ProductCard({card}: ProductCardProps): JSX.Element {

  return (
    <div className="product-card">
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
        <a className="button button--mini" href="/">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
