import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { NAME_KEY_ESCAPE, Scroll } from '../../const';
import { useAppDispatch } from '../../hooks/main';
import { sendComment } from '../../store/api-actions';
import { closeModal, openModalSuccess } from '../../store/modals/modals';
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

  const [invalidName, setInvalidName] = useState(false);
  const [invalidRating, setInvalidRating] = useState(false);
  const [invalidAdvantage, setInvalidAdvantage] = useState(false);
  const [invalidDisadvantage, setInvalidDisadvantage] = useState(false);
  const [invalidComment, setInvalidComment] = useState(false);


  const onSubmit = (commentData: CommentData) => {
    dispatch(sendComment(commentData));
  };

  const handleChangeUserName = (evt:ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
    setInvalidName(false);
  };

  const handleChangeRating = (evt:ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
    setInvalidRating(false);
  };

  const handleChangeAdvantage = (evt:ChangeEvent<HTMLInputElement>) => {
    setAdvantage(evt.target.value);
    setInvalidAdvantage(false);
  };

  const handleChangeDisadvantage = (evt:ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(evt.target.value);
    setInvalidDisadvantage(false);
  };

  const handleChangeComment = (evt:ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    setInvalidComment(false);
  };

  const formSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (userName.length === 0) {setInvalidName(true);}
    if (rating === 0) {setInvalidRating(true);}
    if (advantage.length === 0) {setInvalidAdvantage(true);}
    if (disadvantage.length === 0) {setInvalidDisadvantage(true);}
    if (comment.length === 0) {setInvalidComment(true);}

    if (userName.length !== 0 && rating !== 0 && advantage.length !== 0 && disadvantage.length !== 0 && comment.length !== 0) {
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
    }
  };

  const handleKeyDown = (evt: { key: string; }) => {
    if(evt.key === NAME_KEY_ESCAPE) {
      dispatch(closeModal());
      document.body.style.overflow = Scroll.Scrolling;
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    document.body.style.overflow = Scroll.Scrolling;
  };

  return (
    <FocusLock>
      <div className='modal-feedback' onKeyDown={handleKeyDown}>
        <div className="modal is-active modal--review modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal onClick={handleCloseModal}></div>
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{productName}</h3>
              <form className="form-review" action="#" method="post" onSubmit={formSubmitHandle}>
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input className="form-review__input form-review__input--name"
                      data-testid="userName"
                      value={userName}
                      onChange={handleChangeUserName}
                      id="user-name" type="text" autoComplete="off" autoFocus
                    />
                    <p className="form-review__warning">{invalidName ? 'Заполните поле' : '.'}</p>
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
                            onChange={handleChangeRating}
                          />
                          <label htmlFor={String(star.id)} className='rate__label' title={star.title}></label>
                        </Fragment>
                      ))}
                      <p className="rate__message">{invalidRating ? 'Поставьте оценку' : '.'}</p>
                    </div>
                  </div>
                </div>
                <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
                <input className="form-review__input" id="advantage"
                  type="text" autoComplete="off"
                  data-testid="advantage"
                  value={advantage}
                  onChange={handleChangeAdvantage}
                />
                <p className="form-review__warning">{invalidAdvantage ? 'Заполните поле' : '.'}</p>
                <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
                <input className="form-review__input" id="disadv"
                  type="text" autoComplete="off"
                  data-testid="disadv"
                  value={disadvantage}
                  onChange={handleChangeDisadvantage}
                />
                <p className="form-review__warning">{invalidDisadvantage ? 'Заполните поле' : '.'}</p>
                <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
                <textarea className="form-review__input form-review__input--textarea"
                  id="comment" rows={10} autoComplete="off"
                  data-testid="comment"
                  value={comment}
                  onChange={handleChangeComment }
                >
                </textarea>
                <p className="form-review__warning">{invalidComment ? 'Заполните поле' : '.'}</p>
                <button className="button button--medium-20 form-review__button" type="submit">
                Отправить отзыв
                </button>
              </form>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleCloseModal}>
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
