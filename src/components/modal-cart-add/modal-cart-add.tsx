
import { useCallback, useEffect } from 'react';
import { NAME_KEY_ESCAPE, Scroll, TypeGuitarTranslation } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/main';
import { setGuitarInCart } from '../../store/guitars/guitars';
import { closeModal, openModalAddedSucces } from '../../store/modals/modals';

function  ModalCartAdd(): JSX.Element {
  const dispatch = useAppDispatch();
  const {clickGuitarId} = useAppSelector(({GUITARS}) => GUITARS);
  const {catalogCards} = useAppSelector(({GUITARS}) => GUITARS);

  const guitar = catalogCards.find((item) => item.id === clickGuitarId);

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

  const handleOpenModalAddedSucces = () => {
    dispatch(closeModal());
    dispatch(setGuitarInCart(guitar));
    dispatch(openModalAddedSucces());
  };


  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal-cart--add" onKeyDown={handleKeyDown}>
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`${process.env.PUBLIC_URL}/${guitar?.previewImg}`} width="67" height="137" alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar?.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar?.vendorCode}</p>
                <p className="modal__product-params">{TypeGuitarTranslation.get(String(guitar?.type))}, {guitar?.stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar?.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add"
                onClick={handleOpenModalAddedSucces}
              >
                Добавить в корзину
              </button>
            </div>
            <button className="modal__close-btn button-cross" type="button"
              aria-label="Закрыть" onClick={handleCloseModal}
            ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCartAdd;
