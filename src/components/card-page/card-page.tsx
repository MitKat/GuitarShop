import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TypeGuitarTranslation } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/main';
import useScrollTop from '../../hooks/use-scroll-top';
import { fetchCommentsAction, fetchProductAction } from '../../store/api-actions';
import { Comment } from '../../types/comment';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Comments from '../comments/comments';
import Footer from '../footer/footer';
import Header from '../header/header';
import Rating from '../rating/rating';


function CardPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(({DATA}) => DATA.product);
  const comments: Comment[] = useAppSelector(({DATA}) => DATA.comments);

  useScrollTop();

  useEffect(() => {
    dispatch(fetchProductAction(String(id)));
    dispatch(fetchCommentsAction(String(id)));
  }, [id, dispatch]);

  const [isHiddenCharacteristic, setIsHiddenCharacteristic] = useState(false);
  const [isHiddenDescription, setIsHiddenDescription] = useState(true);

  const HandleChangeTab = () => {
    if (isHiddenCharacteristic) {
      setIsHiddenCharacteristic(false);
      setIsHiddenDescription(true);
    } else {
      setIsHiddenCharacteristic(true);
      setIsHiddenDescription(false);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{product.name}</h1>
          <Breadcrumbs productName={product.name} />
          <div className="product-container">
            <img className="product-container__img"
              src={`${process.env.PUBLIC_URL}/${product.previewImg}`}
              width="90" height="235" alt=""
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{product.name}</h2>
              <div className="rate product-container__rating">
                <Rating rating={product.rating} />
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments.length}</p>
              </div>
              <div className="tabs">
                {
                  isHiddenCharacteristic ?
                    <a className='button button--medium tabs__button  button--black-border'
                      href="#characteristics"
                      onClick={HandleChangeTab}
                    >Характеристики
                    </a>
                    :
                    <a className='button button--medium tabs__button'
                      href="#characteristics"
                    >Характеристики
                    </a>
                }
                {
                  isHiddenDescription ?
                    <a className='button button--medium tabs__button button--black-border'
                      href="#description"
                      onClick={HandleChangeTab}
                    >Описание
                    </a>
                    :
                    <a className='button button--medium tabs__button'
                      href="#description"
                    >Описание
                    </a>
                }
                <div className="tabs__content ">
                  <table hidden={isHiddenCharacteristic} className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{product.vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{TypeGuitarTranslation.get(product.type)}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{product.stringCount} струнная</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description" hidden={isHiddenDescription}>{product.description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{`${product.price} ₽`}</p>
              <a className="button button--red button--big product-container__button" href=" ">Добавить в корзину</a>
            </div>
          </div>
          <Comments comments={comments} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CardPage;

