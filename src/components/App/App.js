import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sign from '../Sign/Sign';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {

  const [loggedIn, sign] = React.useState(true);
  const [isOpened, openMenu] = React.useState(false);
  const [isLoading, loadCards] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({ name: 'Дмитрий', email: 'pochta@mail.ru'});


  function handleOpenMenu () {
    isOpened ? openMenu(false) : openMenu(true);
  }

  return (
    <><Switch>
      <Route exact path="/sign-up">
        <Sign
          isRegister={true}
          greetingText="Добро пожаловать!"
          reqError={true}
          reqErrorText="Ошибка запроса"
          buttonText="Зарегистрироваться"
          link="/sign-in"
          redirectText="Уже зарегистрированы?"
          linkText="Войти"
        />
      </Route>
      <Route exact path="/sign-in">
        <Sign
          greetingText="Рады видеть!"
          reqError={true}
          reqErrorText="Ошибка запроса"
          buttonText="Войти"
          link="/sign-up"
          redirectText="Ещё не зарегистрированы?"
          linkText="Регистрация"
        />
      </Route>
      <Route exact path="/">
        <Main loggedIn={loggedIn} openMenu={handleOpenMenu} />
      </Route>
      <Route exact path="/movies">
        <Movies openMenu={handleOpenMenu} loggedIn={loggedIn} isLoading={isLoading} allMovies="15" />
      </Route>
      <Route exact path="/saved-movies">
        <SavedMovies openMenu={handleOpenMenu} loggedIn={true} />
      </Route>
      <Route exact path="/profile">
        <Profile
          openMenu={handleOpenMenu}
          loggedIn={loggedIn}
          userInfo={userInfo}
          reqError={true}
          reqErrorText="Ошибка запроса"
        />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>

    <Menu openMenu={handleOpenMenu} isOpened={isOpened} currentPage="menu" /></>
  );
}

export default App;
