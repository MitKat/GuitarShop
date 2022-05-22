import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { NAME_KEY_ESCAPE } from '../../const';
import { useAppDispatch } from '../../hooks/main';
import { sendComment } from '../../store/api-actions';
import { closeModal, openModalSuccess } from '../../store/main-process/main-process';
import { CommentData } from '../../types/comment-data';
import './modal-feedback.css';

const STARS_RATING = [
  {
    id: 5,
    name: 'star-5',
    title: 'Отлично',
  },
  {
    id: 4,
    name: 'star-4',
    title: 'Хорошо',
  },
  {
    id: 3,
    name: 'star-3',
    title: 'Нормально',
  },
  {
    id: 2,
    name: 'star-2',
    title: 'Плохо',
  },
  {
    id: 1,
    name: 'star-1',
    title: 'Ужасно',
  },
];

type ModalFeedbackProps = {
  productName: string;
  productId: number;
}

function ModalFeedback({productName, productId}: ModalFeedbackProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const onSubmit = (commentData: CommentData) => {
    dispatch(sendComment(commentData));
  };

  const formSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      guitarId: productId,
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      comment: comment,
      rating: rating,
    });
    dispatch(closeModal());
    dispatch(openModalSuccess());
  };

  const handleKeyDown = (evt: { key: string; }) => {
    if(evt.key === NAME_KEY_ESCAPE) {
      dispatch(closeModal());
    }
  };

  return (
    <FocusLock>
      <div className='modal-feedback' onKeyDown={handleKeyDown}>
        <div className="modal is-active modal--review modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal onClick={() => dispatch(closeModal())}></div>
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{productName}</h3>
              <form className="form-review" action="#" method="post" onSubmit={formSubmitHandle}>
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input className="form-review__input form-review__input--name"
                      value={userName}
                      onChange={(evt:ChangeEvent<HTMLInputElement>) => setUserName(evt.target.value)}
                      id="user-name" type="text" autoComplete="off" autoFocus
                    />
                    <p className="form-review__warning">{(userName.length === 0) ? 'Заполните поле' : '.'}</p>
                  </div>
                  <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse">
                      {STARS_RATING.map((star) => (
                        <Fragment key={star.id}>
                          <input className='visually-hidden'
                            name={star.name}
                            value={String(star.id)}
                            id={String(star.id)}
                            type='radio'
                            checked={rating === star.id}
                            onChange={(evt: ChangeEvent<HTMLInputElement>) => setRating(parseInt(evt.target.value, 10))}
                          />
                          <label htmlFor={String(star.id)} className='rate__label' title={star.title}></label>
                        </Fragment>
                      ))}
                      <p className="rate__message"> {(rating === 0) ? 'Поставьте оценку' : '.'}</p>
                    </div>
                  </div>
                </div>
                <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
                <input className="form-review__input" id="advantage" type="text" autoComplete="off"
                  value={advantage}
                  onChange={(evt:ChangeEvent<HTMLInputElement>) => setAdvantage(evt.target.value)}
                />
                <p className="form-review__warning">{(advantage.length === 0) ? 'Заполните поле' : '.'}</p>
                <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
                <input className="form-review__input" id="disadv" type="text" autoComplete="off"
                  value={disadvantage}
                  onChange={(evt:ChangeEvent<HTMLInputElement>) => setDisadvantage(evt.target.value)}
                />
                <p className="form-review__warning">{(disadvantage.length === 0) ? 'Заполните поле' : '.'}</p>
                <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
                <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off"
                  value={comment}
                  onChange={(evt:ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value)}
                >
                </textarea>
                <p className="form-review__warning">{(comment.length === 0) ? 'Заполните поле' : '.'}</p>
                <button className="button button--medium-20 form-review__button" type="submit"
                  disabled={userName.length === 0 || rating === 0 || advantage.length === 0 || disadvantage.length === 0 || comment.length === 0}
                >
                Отправить отзыв
                </button>
              </form>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => dispatch(closeModal())}>
                <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default ModalFeedback;
