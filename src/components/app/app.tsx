import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Catalog} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
