import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import GuitarPage from '../guitar-page/guitar-page';
import CartPage from '../cart-page/cart-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';


function App(): JSX.Element {

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage urlPage='main'/>} />
      <Route path={AppRoute.Catalog} element={<MainPage urlPage='catalog' />} />
      <Route path={AppRoute.GuitarPage} element={<GuitarPage />} />
      <Route path={AppRoute.CartPage} element={<CartPage />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
