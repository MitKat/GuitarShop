import { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/main';
import { fetchCommentsAction } from '../../store/api-actions';
import { Card } from '../../types/card';
import { Comment } from '../../types/comment';
import Rating from '../rating/rating';

type ProductCardProps = {
    card: Card,
}

function ProductCard({card}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comments: Comment[]= useAppSelector(({DATA}) => DATA.comments);

  useEffect(() => {
    dispatch(fetchCommentsAction(String(card.id)));
  }, [card.id, dispatch]);

  const mouseOverHandler = () => {
    setMouseOver(card.id);
  };
  const mouseOutHandler = () => {
    setMouseOver(-1);
  };

  const [mouseOver, setMouseOver] = useState(-1);

  return (
    <div className="product-card" onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
      <img src={`${process.env.PUBLIC_URL}/${card.previewImg}`}  width="75" height="190" alt={card.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={card.rating} />
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9 {comments.length}</p>
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
