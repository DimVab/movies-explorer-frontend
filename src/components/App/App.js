import { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Sign from '../Sign/Sign';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import mainApi from '../../utils/MainApi';

function App() {

// переменные состояния
  const [loggedIn, setLoginStatus] = useState(false);
  const [isOpened, openMenu] = useState(false);
  const [isLoading, loadCards] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: ''});
  const [reqErrorText, setReqErrorText] = useState('');

  const history = useHistory();

  function handleOpenMenu () {
    isOpened ? openMenu(false) : openMenu(true);
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then((res) => {
        setLoginStatus(true);
        history.push('./movies');
        console.log("Регистрация прошла успешно");
        // возможно, стоит сделать какой-то попап, показывающий успешность регистрации
      })
      .catch((err) => {
        if (err.status === "409") {
          console.log(`${err}. Такой email уже занят`);
        } else console.log(`${err}. Email или пароль не прошли валидацию на сервере при регистрации`);
      });
  }

  function handleAuthorize(email, password) {
    mainApi.authorize(email, password)
      .then(() => {
        setLoginStatus(true);
        history.push('./movies');
        console.log("Авторизация прошла успешно");
      })
      .catch((err) => {
        console.log(`${err}: неверный email или пароль`);
      });
  }

  function handleSignOut() {
    mainApi.logout()
    .then(() => {
      setLoginStatus(false);
      history.push('./');
      console.log("Вы вышли из аккаунта");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function getUserInfo () {
    mainApi.getUserInfo()
    .then((user) => {
      setUserInfo({ name: user.name, email: user.email});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleEditProfile(userData) {
    mainApi.editUserInfo(userData)
    .then((newUserInfo) => {
      setUserInfo({name: newUserInfo.name, email: newUserInfo.email});
      console.log('Данные о пользователе изменены успешно');
      console.log(newUserInfo);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="app"><Switch>
      <Route exact path="/signup">
        <Sign
          isRegister={true}
          greetingText="Добро пожаловать!"
          reqError={true}
          reqErrorText={reqErrorText}
          buttonText="Зарегистрироваться"
          link="/signin"
          redirectText="Уже зарегистрированы?"
          linkText="Войти"
          onSubmit={handleRegister}
        />
      </Route>
      <Route exact path="/signin">
        <Sign
          greetingText="Рады видеть!"
          reqError={true}
          reqErrorText={reqErrorText}
          buttonText="Войти"
          link="/signup"
          redirectText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          onSubmit={handleAuthorize}
        />
      </Route>
      <Route exact path="/">
        <Main loggedIn={loggedIn} openMenu={handleOpenMenu} />
      </Route>
      <Route exact path="/movies">
        <Movies openMenu={handleOpenMenu} loggedIn={loggedIn} isLoading={isLoading} />
      </Route>
      <Route exact path="/saved-movies">
        <SavedMovies openMenu={handleOpenMenu} loggedIn={true} />
      </Route>
      <Route exact path="/profile">
        <Profile
          getUserInfo={getUserInfo}
          openMenu={handleOpenMenu}
          loggedIn={loggedIn}
          userInfo={userInfo}
          reqError={true}
          reqErrorText="Ошибка запроса"
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
        />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>

    <Menu openMenu={handleOpenMenu} isOpened={isOpened} currentPage="menu" /></div>
  );
}

export default App;
