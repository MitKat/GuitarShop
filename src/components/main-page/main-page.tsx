import { useEffect, useState } from 'react';
import { CARDS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks/main';
import CatalogCards from '../catalog-cards/catalog-cards';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loading from '../loading/loading';
import Pagination from '../pagination/pagination';


function MainPage(): JSX.Element {
  const catalogCards = useAppSelector((state) => state.cards);
  const currentPage = useAppSelector((state) => state.currentPage);
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  const countPage = Math.ceil(catalogCards.length/CARDS_PER_PAGE);
  const [cards, setCards] = useState(catalogCards.slice(0, CARDS_PER_PAGE));
  const lastIndex = currentPage*CARDS_PER_PAGE;
  const firstIndex = lastIndex - CARDS_PER_PAGE;

  useEffect(() => {
    setCards(catalogCards.slice(firstIndex, lastIndex));

  }, [catalogCards,firstIndex, lastIndex]);


  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort />
            {
              isDataLoaded ?
                <>
                  <CatalogCards catalogCards={cards} />
                  <Pagination countPage={countPage} currentPage={currentPage} />
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
