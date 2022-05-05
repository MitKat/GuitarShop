import { Card } from '../../types/card';
import ProductCard from '../product-card/product-card';

type CatalogCardsProps = {
    catalogCards: Card[];
}

function CatalogCards({catalogCards}: CatalogCardsProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {
        catalogCards.map((card) => (
          <ProductCard key={card.id} card={card} />
        ))
      }
      <div className="product-card">
        <img src="img/content/catalog-product-0.jpg" srcSet="img/content/catalog-product-0@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus Acoustics</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-1.jpg" srcSet="img/content/catalog-product-1@2x.jpg 2x" width="75" height="190" alt="Честер Bass" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">Честер Bass</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>51 100 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red-border button--mini button--in-cart" href='/'>В Корзине</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-2.jpg" srcSet="img/content/catalog-product-2@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-3.jpg" srcSet="img/content/catalog-product-3@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus Acoustics</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-4.jpg" srcSet="img/content/catalog-product-4@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-5.jpg" srcSet="img/content/catalog-product-5@2x.jpg 2x" width="75" height="190" alt="Честер Bass" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">Честер Bass</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>51 100 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red-border button--mini button--in-cart" href="/">В Корзине</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-6.jpg" srcSet="img/content/catalog-product-6@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus Acoustics</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-7.jpg" srcSet="img/content/catalog-product-7@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus Acoustics</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
      <div className="product-card">
        <img src="img/content/catalog-product-8.jpg" srcSet="img/content/catalog-product-8@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus" />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>76</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="button button--mini" href="/">Подробнее</a>
          <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
        </div>
      </div>
    </div>
  );
}

export default CatalogCards;
