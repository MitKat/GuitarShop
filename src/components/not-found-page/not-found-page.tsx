import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">
          <h1>404. Page not found.</h1>
          <Link to={AppRoute.Main}>Вернуться на главную страницу.</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
