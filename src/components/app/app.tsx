import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CardPage from '../card-page/card-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage urlPage='main'/>} />
        <Route path={AppRoute.Catalog} element={<MainPage urlPage='catalog' />} />
        <Route path={AppRoute.CardPage} element={<CardPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
