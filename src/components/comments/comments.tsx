import { useState } from 'react';
import { Comment } from '../../types/comment';
import Rating from '../rating/rating';

type CommentsProps = {
    comments: Comment[];
}

const COMMENTS_SHOW_DEFAULT = 3;
let COMMENTS_SHOW_MORE = 3;


function Comments({comments}: CommentsProps): JSX.Element {
  const [commentsRender, setCommentsRender] = useState(comments.slice(0, COMMENTS_SHOW_DEFAULT));
  const [buttonShow, setButtonShow] = useState(true);

  const HandlerRenderComments = () => {
    COMMENTS_SHOW_MORE += COMMENTS_SHOW_MORE;

    if (comments.length <= COMMENTS_SHOW_MORE) {
      setButtonShow(false);
    }

    setCommentsRender(comments.slice(0, COMMENTS_SHOW_MORE));
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button className="button button--red-border button--big reviews__sumbit-button" >Оставить отзыв</button>
      {
        commentsRender.map((comment) => (
          <div className="review" key={comment.id}>
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4><span className="review__date">{comment.createAt}12 декабря</span>
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
      {buttonShow && <button className="button button--medium reviews__more-button" onClick={HandlerRenderComments}>Показать еще отзывы</button>}
      <a className="button button--up button--red-border button--big reviews__up-button" href='#header'>Наверх</a>
    </section>
  );
}

export default Comments;
