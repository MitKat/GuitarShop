import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, NAME_KEY_ESCAPE, Scroll } from '../../const';
import { useAppDispatch } from '../../hooks/main';
import { closeModal } from '../../store/modals/modals';

function  ModalCartsuccess(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback((evt: { key: string; }) => {
    if(evt.key === NAME_KEY_ESCAPE) {
      dispatch(closeModal());
      document.body.style.overflow = Scroll.Scrolling;
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCloseModal = () => {
    dispatch(closeModal());
    document.body.style.overflow = Scroll.Scrolling;
  };

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal-success--add" onKeyDown={handleKeyDown}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <Link className="button button--small modal__button" to={AppRoute.CartPage}>Перейти в корзину</Link>
              <Link className="button button--black-border button--small modal__button modal__button--right"
                to={AppRoute.Main} onClick={handleCloseModal}
              >
              Продолжить покупки
              </Link>
            </div>
            <button className="modal__close-btn button-cross"
              type="button" aria-label="Закрыть"
              onClick={handleCloseModal}
            >
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCartsuccess;
