import React from 'react';
import { useState, useMemo } from 'react';
import { Scroll } from '../../const';
import { useAppDispatch } from '../../hooks/main';
import { openModal } from '../../store/modals/modals';
import { Comment } from '../../types/comment';
import Rating from '../rating/rating';

const COMMENTS_SHOW_DEFAULT = 3;
const COMMENTS_SHOW_MORE = 3;

type CommentsProps = {
  comments: Comment[];
}

function Comments({comments}: CommentsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [commentsAmountRender, setCommentsAmountRender] = useState(COMMENTS_SHOW_DEFAULT);

  const commentsToRender = useMemo(() => {
    if (!comments) {
      return [];
    }

    const commentsSort = [...comments].sort((commentA, commentB) =>
      (Number(new Date(commentB.createAt)) - Number(new Date(commentA.createAt))),
    );
    return commentsSort.slice(0, commentsAmountRender);

  }, [comments, commentsAmountRender]);

  const handleShowMoreCLick = () => {
    const commentsAmountShowMore = commentsAmountRender + COMMENTS_SHOW_MORE;
    setCommentsAmountRender(commentsAmountShowMore);
  };

  const handleOpenModal = () => {
    dispatch(openModal());
    document.body.style.overflow = Scroll.NoScrolling;
  };

  const getFormatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ru-RU', {month: 'long', day: 'numeric'});
  };

  const isShowMoreButtonVisible = commentsAmountRender < comments?.length;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button className="button button--red-border button--big reviews__sumbit-button"
        onClick={handleOpenModal}
      >
        Оставить отзыв
      </button>
      {
        commentsToRender.map((comment) => (
          <div className="review" key={comment.id}>
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
              <span className="review__date">{getFormatDate(comment.createAt)}</span>
            </div>
            <div className="rate review__rating-panel">
              <Rating rating={comment.rating} />
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">{comment.advantage}</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">{comment.disadvantage}</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">{comment.comment}</p>
          </div>
        ))
      }
      <a href='#header' className="button button--up button--red-border button--big reviews__up-button" style={{zIndex: 1}}>Наверх</a>
      {isShowMoreButtonVisible && <button className="button button--medium reviews__more-button" onClick={handleShowMoreCLick}>Показать еще отзывы</button>}
    </section>
  );

}

export default React.memo(Comments);
