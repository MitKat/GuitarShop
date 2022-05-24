// import { NAME_KEY_ESCAPE } from '../../const';
import { useCallback, useEffect } from 'react';
import { NAME_KEY_ESCAPE } from '../../const';
import { useAppDispatch } from '../../hooks/main';
import { closeModal } from '../../store/main-process/main-process';
import './modal-success-comment.css';

function  ModalSuccessComment(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback((evt: { key: string; }) => {
    if(evt.key === NAME_KEY_ESCAPE) {
      dispatch(closeModal());
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="modal-success" onKeyDown={handleKeyDown}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={() => dispatch(closeModal())}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review"
                onClick={() => dispatch(closeModal())} autoFocus
              >
                К покупкам!
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => dispatch(closeModal())} >
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessComment;
