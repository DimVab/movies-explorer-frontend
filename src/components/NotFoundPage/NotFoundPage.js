import { useHistory } from 'react-router-dom';

function NotFoundPage () {

  const history = useHistory();

  return(
    <>
      <div className="not-found-page">
        <div>
          <h1 className="not-found-page__heading">404</h1>
          <p className="not-found-page__text">Страница не найдена</p>
        </div>
        <button className="not-found-page__link" type="button" onClick={() => history.goBack()}>Назад</button>
      </div>
    </>
  );
}

export default NotFoundPage;