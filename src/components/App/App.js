import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Sign from '../Sign/Sign';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from '../../utils/MainApi';
import getMovies from '../../utils/MoviesApi';

function App() {

// переменные состояния
  const [loggedIn, setLoginStatus] = useState(false);
  const [isOpened, openMenu] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [onEdit, setEdit] = useState(false);
  const [reqErrorText, setReqErrorText] = useState('');
  const [moviesStorage, fillMoviesStorage] = useState([]);
  const [savedMovies, fillSavedMoviesStorage] = useState([]);
  const [searchLimiter, setSearchLimiter] = useState(12);
  const [isError, throwErrorMessage] = useState(false);
  const [isEmpty, throwEmptyMessage] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // в самом начале получаем информацию о пользователе либо сообщение о необходимости авторизации
    window.addEventListener('resize', handleResize);
    mainApi.checkToken()
      .then(() => {
        setLoginStatus(true);
        getUserInfo();
        getSavedMovies();
      })
      .catch(() => {
        console.log('Необходимо авторизироваться');
      });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('showShortMovies') && localStorage.getItem('shortMovies')) {
        fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies'))
          .filter((movie, i) => {
            return i < searchLimiter;
          })  
        );
      } else if(JSON.parse(localStorage.getItem('allMovies'))) {
        localStorage.setItem('movies', JSON.stringify(JSON.parse(localStorage.getItem('allMovies'))
          .filter((movie, i) => {
            return i < searchLimiter;
          })  
        ));
        // #TODO Возможно в будущем убрать прослойку в виде movies, подумать нужна ли она вообще
        fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
      }
    }

  }, [searchLimiter]);

  function handleResize(e) {
    if (e.target.screen.width > 1024) {
      setSearchLimiter(12);
    } else if (e.target.screen.width > 525) {
      setSearchLimiter(8);
    } else {
      setSearchLimiter(5);
    }
  }

  function handleOpenMenu () {
    isOpened ? openMenu(false) : openMenu(true);
  }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        console.log("Регистрация прошла успешно");
      })
      .then(() => {
        handleAuthorize(email, password);
      })
      .catch((err) => {
        if (err === "409") {
          console.log(`Ошибка ${err}: такой email уже занят`);
        } else { 
          console.log(`Ошибка ${err}: email или пароль не прошли валидацию на сервере при регистрации`);
        }
      });
  }

  function handleAuthorize(email, password) {
    mainApi.authorize(email, password)
      .then(() => {
        setLoginStatus(true);
        history.push('./movies');
        console.log("Авторизация прошла успешно");
      })
      .then(() => {
        getUserInfo();
      })
      .catch((err) => {
        console.log(`Ошиюка ${err}: неверный email или пароль`);
      });
  }

  function handleSignOut() {
    mainApi.logout()
    .then(() => {
      setLoginStatus(false);
      localStorage.removeItem('moviesKeyword');
      localStorage.removeItem('savedMoviesKeyword');
      localStorage.removeItem('showShortMovies');
      localStorage.removeItem('showShortSavedMovies');
      localStorage.removeItem('allMovies');
      localStorage.removeItem('movies');
      localStorage.removeItem('shortMovies');
      localStorage.removeItem('savedMovies');
      localStorage.removeItem('shortSavedMovies');
      localStorage.removeItem('filteredSavedMovies');
      localStorage.removeItem('filteredShortSavedMovies');
      fillMoviesStorage([]);
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
      setEdit(false);
    })
    .catch((err) => {
      if (err === "409") {
        console.log(`Ошибка ${err}: такой email уже занят`);
      } else { 
        console.log(`Ошибка ${err}: имя или email не прошли валидацию на сервере`);
      }
    });
  }

  function findMovies (keyword) {
    throwEmptyMessage(false);
    throwErrorMessage(false);
    setLoadingStatus(true);
    fillMoviesStorage([]);
    localStorage.removeItem('allMovies');
    getMovies()
      .then((movies) => {
        return movies.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
        });
      })
      .then((filteredMovies) => {
        setLoadingStatus(false);
        if (filteredMovies.length === 0) {
          throwEmptyMessage(true);
          return;
        }
        localStorage.setItem('allMovies', JSON.stringify(filteredMovies));
        if (window.screen.width > 1024) {
          setSearchLimiter(12);
        } else if (window.screen.width > 525) {
          setSearchLimiter(8);
        } else {
          setSearchLimiter(5);
        }
        localStorage.setItem('movies', JSON.stringify(JSON.parse(localStorage.getItem('allMovies'))
          .filter((movie, i) => {
            return i < searchLimiter;
          })  
        ));
        fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
        // если включён фильтр короткометражек
        if (localStorage.getItem('showShortMovies')) {
          localStorage.setItem('shortMovies', JSON.stringify(filteredMovies
            .filter((movie) => {
              return movie.duration <= 40;
            })
            .filter((movie, i) => {
              return i < searchLimiter;
            }) 
          ));
          fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies')));
        }
      })
      .catch((err) => {
        console.log(`Во время запроса произошла ошибка ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`);
        setLoadingStatus(false);
        throwErrorMessage(true);
      });
  }

  function increaseSearchLimiter() {
    if (window.screen.width > 1024) {
      setSearchLimiter(searchLimiter + 3);
    } else {
      setSearchLimiter(searchLimiter + 2);
    }
  }

  function getSavedMovies () {
    mainApi.getSavedMovies()
    // #TODO
    /* Правильный алгоритм:
    1) получить фильмы и сохранить в saved-movies [есть]
    2) исходя из if, провести соответствующие операции с массивами в локальных хранилищах
    2.1) вынести в app.js все функции из нижних компонентов (фильтр, поиск и тп), чтобы можно было провести операции
    3) обновить стейт-переменную с сохранёнными фильмами [есть]
    */
      .then((movies) => {
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        // 1. если включён фильтр по короткометражкам
        if (localStorage.getItem('showShortSavedMovies')) {
          // 1.1 если был поиск по символам
          if (JSON.parse(localStorage.getItem('filteredShortSavedMovies'))) {
            fillSavedMoviesStorage(JSON.parse(localStorage.getItem('filteredShortSavedMovies')).reverse());
          } else {
            // 1.2 если не было поиска
            // FIXME это не правильно работает, тк загружает уже существующий список, а, если добавить новый фильм, то он сразу не обновится
            fillSavedMoviesStorage(JSON.parse(localStorage.getItem('shortSavedMovies')).reverse());
          }
        // 2. если фильтр НЕ включён
        } else if (JSON.parse(localStorage.getItem('filteredSavedMovies'))) {
          // 2.1 если был поиск по символам
          fillSavedMoviesStorage(JSON.parse(localStorage.getItem('filteredSavedMovies')).reverse());
        } else {
          // 2.2 если не было поиска
          fillSavedMoviesStorage(JSON.parse(localStorage.getItem('savedMovies')).reverse());
        }
      })
      .catch((err) => {
        console.log(`Во время запроса произошла ошибка ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`);
      });
  }

  function saveMovie (movie, callback) {
    console.log(movie);
    mainApi.addMovie(movie)
      .then((res) => {
        console.log('Фильм успешно сохранён');
        // коллбэк на случай, если данные фильма не проходят валидацию на сервере (у некоторых фильмов отсутствует поле "country")
        callback();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}. Данные фильма не прошли валидацию на сервере`);
      });
  }

  function deleteMovie (movieId) {
    mainApi.removeMovie(movieId)
      .then(() => {
        localStorage.setItem('savedMovies', JSON.stringify(JSON.parse(localStorage.getItem('savedMovies'))
          .filter((savedMovie) => {
            return savedMovie._id !== movieId;
          })
        ));
        // #TODO вот здесь прописать различные условия
        if (localStorage.getItem('showShortSavedMovies')) {
          // 1.1 если был поиск по символам
          if (JSON.parse(localStorage.getItem('filteredShortSavedMovies'))) {
            localStorage.setItem('filteredShortSavedMovies', JSON.stringify(JSON.parse(localStorage.getItem('filteredShortSavedMovies'))
            .filter((savedMovie) => {
              return savedMovie._id !== movieId;
            })
          ));
            fillSavedMoviesStorage(JSON.parse(localStorage.getItem('filteredShortSavedMovies')).reverse());
          } else {
            // 1.2 если не было поиска
            localStorage.setItem('shortSavedMovies', JSON.stringify(JSON.parse(localStorage.getItem('shortSavedMovies'))
              .filter((savedMovie) => {
                return savedMovie._id !== movieId;
              })
            ));
            fillSavedMoviesStorage(JSON.parse(localStorage.getItem('shortSavedMovies')).reverse());
          }
        // 2. если фильтр НЕ включён
        } else if (JSON.parse(localStorage.getItem('filteredSavedMovies'))) {
          // 2.1 если был поиск по символам
          localStorage.setItem('filteredSavedMovies', JSON.stringify(JSON.parse(localStorage.getItem('filteredSavedMovies'))
            .filter((savedMovie) => {
              return savedMovie._id !== movieId;
            })
          ));
          fillSavedMoviesStorage(JSON.parse(localStorage.getItem('filteredSavedMovies')).reverse());
        } else {
          // 2.2 если не было поиска
          fillSavedMoviesStorage(JSON.parse(localStorage.getItem('savedMovies')).reverse());
        }
        console.log('Фильм успешно удалён');
      })
      .catch((err) => {
        console.log(err);
        console.log('Не получилось удалить фильм');
      });
  }

  function unmarkMovie (movie) {
    // #FIXME 
    console.log(movie);
    mainApi.removeMovie(movie._id)
      .then(() => {
        console.log('Фильм удалён из сохранённых фильмов');
      })
      .catch((err) => {
        console.log(err);
        console.log('Не получилось удалить фильм');
      });
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div className="app"><Switch>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          openMenu={handleOpenMenu}
          isLoading={isLoading}
          findMovies={findMovies}
           moviesStorage={moviesStorage}
          fillMoviesStorage={fillMoviesStorage}
          saveMovie={saveMovie}
          savedMovies={savedMovies}
          unmarkMovie={unmarkMovie}
          searchLimiter={searchLimiter}
          setSearchLimiter={setSearchLimiter}
          increaseSearchLimiter={increaseSearchLimiter}
          isEmpty={isEmpty}
          isError={isError}
          throwEmptyMessage={throwEmptyMessage}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          openMenu={handleOpenMenu} 
          getSavedMovies={getSavedMovies} 
          savedMovies={savedMovies}
          fillMoviesStorage={fillSavedMoviesStorage}
          deleteMovie={deleteMovie}
          isEmpty={isEmpty}
          throwEmptyMessage={throwEmptyMessage}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          onEdit={onEdit}
          setEdit={setEdit}
          getUserInfo={getUserInfo}
          openMenu={handleOpenMenu}
          reqError={true}
          reqErrorText="Ошибка запроса"
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}  
        />
        <Route exact path="/signup">
          {loggedIn ?
          <Redirect to='/'/>
          : <Sign
              isRegister={true}
              greetingText="Добро пожаловать!"
              reqError={true}
              reqErrorText={reqErrorText}
              buttonText="Зарегистрироваться"
              link="/signin"
              redirectText="Уже зарегистрированы?"
              linkText="Войти"
              onSubmit={handleRegister}
          />}
        </Route>
        <Route exact path="/signin">
          {loggedIn ?
          <Redirect to='/'/>
          : <Sign
              greetingText="Рады видеть!"
              reqError={true}
              reqErrorText={reqErrorText}
              buttonText="Войти"
              link="/signup"
              redirectText="Ещё не зарегистрированы?"
              linkText="Регистрация"
              onSubmit={handleAuthorize}
          />}
        </Route>
        <Route exact path="/">
          <Main loggedIn={loggedIn} openMenu={handleOpenMenu}/>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      <Menu openMenu={handleOpenMenu} isOpened={isOpened} currentPage="menu" /></div>

    </CurrentUserContext.Provider>
  );
}

export default App;
