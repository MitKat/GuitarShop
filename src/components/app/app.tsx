import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/main';
import MainPage from '../main-page/main-page';

function App(): JSX.Element {
  const cards = useAppSelector((state) => state.cards);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Catalog} element={<MainPage catalogCards={cards} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
