import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CARDS_PER_PAGE } from '../../const';
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

  const countPage = Math.ceil(catalogCards.length/CARDS_PER_PAGE);
  const [cards, setCards] = useState(catalogCards.slice(0, CARDS_PER_PAGE));

  useEffect(() => {
    const lastIndex = Number(pageNumber)*CARDS_PER_PAGE;
    const firstIndex = lastIndex - CARDS_PER_PAGE;

    if (urlPage === 'main') {
      setCards(catalogCards.slice(0, CARDS_PER_PAGE));
    }
    if (urlPage === 'catalog') {
      setCards(catalogCards.slice(firstIndex, lastIndex));
    }

  }, [catalogCards, pageNumber, urlPage]);


  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
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
