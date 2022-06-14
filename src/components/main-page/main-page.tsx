import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CARDS_PER_PAGE, TypeOrder, TypeSort } from '../../const';
import { useAppSelector } from '../../hooks/main';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CatalogCards from '../catalog-cards/catalog-cards';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loading from '../loading/loading';
import Pagination from '../pagination/pagination';

type MainPageProps = {
  urlPage: 'main' | 'catalog';
};

function MainPage({urlPage}: MainPageProps): JSX.Element {
  const {catalogCards} = useAppSelector(({DATA}) => DATA);
  const {isDataLoaded} = useAppSelector(({DATA}) => DATA);
  const {pageNumber} = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const typeSort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  const catalogSort = useMemo(() => {

    let sort = catalogCards;

    if (!typeSort) {
      return sort;
    }

    switch (order) {
      case TypeOrder.Asc:
        switch (typeSort) {
          case TypeSort.Price:
            sort = [...catalogCards].sort((offerA, offerB) => (offerA.price - offerB.price));
            break;
          case TypeSort.Rating:
            sort = [...catalogCards].sort((offerA, offerB) => (offerA.rating - offerB.rating));
            break;
        }
        break;
      case TypeOrder.Desc:
        switch (typeSort) {
          case TypeSort.Price:
            sort = [...catalogCards].sort((offerA, offerB) => (offerB.price - offerA.price));
            break;
          case TypeSort.Rating:
            sort = [...catalogCards].sort((offerA, offerB) => (offerB.rating - offerA.rating));
            break;
        }
        break;
    }

    return sort;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSort, order]);


  const countPage = Math.ceil(catalogSort.length/CARDS_PER_PAGE);
  const [cards, setCards] = useState(catalogSort.slice(0, CARDS_PER_PAGE));

  useEffect(() => {
    const lastIndex = Number(pageNumber)*CARDS_PER_PAGE;
    const firstIndex = lastIndex - CARDS_PER_PAGE;

    if (urlPage === 'main') {
      setCards(catalogSort.slice(0, CARDS_PER_PAGE));
    }
    if (urlPage === 'catalog') {
      setCards(catalogSort.slice(firstIndex, lastIndex));
    }

  }, [catalogSort, pageNumber, urlPage]);

  return (
    <div className="wrapper">
      <Header currentCatalog />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort typeSort={typeSort} order={order} setSearchParams={setSearchParams}/>
            {
              isDataLoaded ?
                <>
                  <CatalogCards catalogCards={cards} />
                  <Pagination countPage={countPage} />
                </>
                :
                <Loading />
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
