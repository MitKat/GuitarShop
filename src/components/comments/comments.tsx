import { useMemo, useState } from 'react';
import { useAppDispatch } from '../../hooks/main';
import { openModal } from '../../store/main-process/main-process';
import { Comment } from '../../types/comment';
import Rating from '../rating/rating';

const COMMENTS_SHOW_DEFAULT = 3;
const COMMENTS_SHOW_MORE = 3;

type CommentsProps = {
  comments: Comment[];
}

function Comments({comments}: CommentsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [buttonShow, setButtonShow] = useState(true);
  const [commentsAmountRender, setCommentsAmountRender] = useState(COMMENTS_SHOW_DEFAULT);

  const commentsRender = useMemo(() => {
    const commentsSort = [...comments].sort((commentA, commentB) =>
      (Number(new Date(commentB.createAt)) - Number(new Date(commentA.createAt))),
    );
    return commentsSort.slice(0, commentsAmountRender);
  }, [comments, commentsAmountRender]);

  const handleShowMoreCLick = () => {
    const commentsAmountShowMore = commentsAmountRender + COMMENTS_SHOW_MORE;
    setCommentsAmountRender(commentsAmountShowMore);

    if (comments.length <= commentsAmountShowMore) {
      setButtonShow(false);
    }
  };

  const getFormatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ru-RU', {month: 'long', day: 'numeric'});
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button className="button button--red-border button--big reviews__sumbit-button" onClick={() => dispatch(openModal())}>Оставить отзыв</button>
      {
        commentsRender.map((comment) => (
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
      <a href='#header' className="button button--up button--red-border button--big reviews__up-button">Наверх</a>
      {(buttonShow && (comments.length > COMMENTS_SHOW_DEFAULT)) && <button className="button button--medium reviews__more-button" onClick={handleShowMoreCLick}>Показать еще отзывы</button>}
    </section>
  );
}

export default Comments;
