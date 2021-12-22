import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Login from '../Login/Login';
import Register from '../Register/Register';

import mainApi from '../../utils/MainApi';
import getMovies from '../../utils/MoviesApi';

import { errorMessages } from '../../utils/messages';

function App() {

// переменные состояния
  const [loggedIn, setLoginStatus] = useState(false);
  const [isOpened, openMenu] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [onEdit, setEdit] = useState(false);
  // переменные состояния ошибок
  const [profileReqErrorText, setProfileReqErrorText] = useState('');
  const [regReqErrorText, setRegReqErrorText] = useState('');
  const [authReqErrorText, setAuthReqErrorText] = useState('');
  const [profileReqError, showProfileReqError] = useState(false);
  const [regReqError, showRegReqError] = useState(false);
  const [authReqError, showAuthReqError] = useState(false);
  // Хранилища фильмов и отображаемых фильмов
  // нужно только для того, чтобы расчитывать рендеринг кнопки "ещё":
  const [moviesStorage, fillMoviesStorage] = useState([]);
  // нужно только для того, чтобы искать сохранённые фильмы для удаления в movies:
  const [savedMoviesStorage, fillSavedMoviesStorage] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);

  const [searchLimiter, setSearchLimiter] = useState(12);
  const [isError, throwErrorMessage] = useState(false);
  const [isMoviesEmpty, throwMoviesEmptyMessage] = useState(false);
  const [isSavedMoviesEmpty, throwSavedMoviesEmptyMessage] = useState(false);
  const [moviesKeyword, setMoviesKeyword] = useState('');
  const [savedMoviesKeyword, setSavedMoviesKeyword] = useState('');

  const [isAuthSent, setAuth] = useState(false);

  const history = useHistory();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if (localStorage.getItem('currentSearchLimiter')) {
      // если ранее пользователь искал фильмы, то при перезагрузке страницы приложение отобразит такое же количество фильмов, какое было до перезагрузки несмотря на размер экрана
      setSearchLimiter(Number(localStorage.getItem('currentSearchLimiter')));
    } else {
      handleResize();
    }
    mainApi.checkToken()
      .then(() => {
        setLoginStatus(true);
        getUserInfo();
        // нужно, чтобы иметь доступ к хранилищу сохранённых фильмов в movies
        getSavedMovies(savedMoviesKeyword);
      })
      .catch(() => {
        setAuth(true);
      });
  }, []);

  function handleResize() {
    if (window.screen.width > 1024) {
      setSearchLimiter(12);
    } else if (window.screen.width > 525) {
      setSearchLimiter(8);
    } else {
      setSearchLimiter(5);
    }
  }

  function filterBySearchLimiter(movies) {
    return movies.filter((movie, i) => {
      return i < searchLimiter;
    });
  }

  function handleOpenMenu (e) {
    isOpened ? openMenu(false) : openMenu(true);
  }

  // Функции, связанные с регистрацией и авторизацией
  function handleRegister(name, email, password) {
    showRegReqError(false);
    mainApi.register(name, email, password)
      .then(() => {
        handleAuthorize(email, password);
      })
      .catch((err) => {
        showRegReqError(true);
        if (err === "409") {
          setRegReqErrorText(errorMessages.sign.email);
        } else if (err.name === 'TypeError') {
          setRegReqErrorText(errorMessages.sign.connect);
        } else if (err === '400') { 
          setRegReqErrorText(errorMessages.sign.validation);
        } else {
          setRegReqErrorText(errorMessages.sign.default);
        }
      });
  }

  function handleAuthorize(email, password) {
    showAuthReqError(false);
    mainApi.authorize(email, password)
      .then(() => {
        setLoginStatus(true);
        history.push('./movies');
      })
      .then(() => {
        getUserInfo();
      })
      .catch((err) => {
        showAuthReqError(true);
        if (err === "401") {
          setAuthReqErrorText(errorMessages.sign.unathorized);
        } else if (err.name === 'TypeError') {
          setAuthReqErrorText(errorMessages.sign.connect);
        } else if (err === '400') { 
          setAuthReqErrorText(errorMessages.sign.validation);
        } else {
          setAuthReqErrorText(errorMessages.sign.default);
        }
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
      localStorage.removeItem('movies');
      localStorage.removeItem('currentSearchLimiter');
      fillMoviesStorage([]);
      history.push('./');
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }

  function getUserInfo () {
    mainApi.getUserInfo()
    .then((user) => {
      setUserInfo({ name: user.name, email: user.email});
      setAuth(true);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }

  function handleEditProfile(userData) {
    showProfileReqError(false);
    mainApi.editUserInfo(userData)
    .then((newUserInfo) => {
      setUserInfo({name: newUserInfo.name, email: newUserInfo.email});
      setEdit(false);
    })
    .catch((err) => {
      showProfileReqError(true);
      if (err === '409') {
        setProfileReqErrorText(errorMessages.sign.email);
      } else if (err.name === 'TypeError') {
        setProfileReqErrorText(errorMessages.sign.connect);
      } else if (err === '400') { 
        setProfileReqErrorText(errorMessages.sign.validation);
      } else {
        setProfileReqErrorText(errorMessages.sign.default);
      }
    });
  }

  function findMovies (moviesKeyword) {
    throwEmptyMessage(false);
    throwErrorMessage(false);
    setLoadingStatus(true);
    fillMoviesStorage([]);
    setCurrentMovies([]);
    localStorage.removeItem('movies');
    localStorage.removeItem('currentSearchLimiter');
    localStorage.setItem('moviesKeyword', moviesKeyword);
    getMovies()
      .then((movies) => {
        return filterMoviesBySymbols(movies, moviesKeyword);
      })
      .then((filteredMovies) => {
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        fillMoviesStorage(filteredMovies);
        // проверяем ширину экрана
        handleResize();
        // если включён фильтр короткометражек
        if (localStorage.getItem('showShortMovies')) {
          setCurrentMovies(filterBySearchLimiter(filterMoviesByDuration(filteredMovies)));
        } else {
          setCurrentMovies(filterBySearchLimiter(filteredMovies));
        }
      })
      .catch(() => {
        throwErrorMessage(true);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }

  function findSavedMovies(savedMoviesKeyword) {
    throwEmptyMessage(false);
    localStorage.setItem('savedMoviesKeyword', savedMoviesKeyword);
    if (localStorage.getItem('showShortSavedMovies')) {
      setCurrentSavedMovies(filterMoviesByDuration(filterMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword)));
    } else {
      setCurrentSavedMovies(filterMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword));
    }
  }

  function increaseSearchLimiter() {
    if (window.screen.width > 1024) {
      setSearchLimiter(searchLimiter + 3);
    } else {
      setSearchLimiter(searchLimiter + 2);
    }
  }

  function getSavedMovies (savedMoviesKeyword) {
    
    if (localStorage.getItem('savedMoviesKeyword') === '') {
      localStorage.removeItem('savedMoviesKeyword');
    } else if (localStorage.getItem('savedMoviesKeyword')) {
      setSavedMoviesKeyword(localStorage.getItem('savedMoviesKeyword'));
    }

    mainApi.getSavedMovies()
      .then((savedMovies) => {
        // заполнить хранилище сохранённых фильмов
        fillSavedMoviesStorage(savedMovies);
        // 1. если включён фильтр по короткометражкам
        if (localStorage.getItem('showShortSavedMovies')) {
          // 1.1 если был поиск по символам
          if (localStorage.getItem('savedMoviesKeyword')) {
            // фильтруем и по символаи и по длительности
            setCurrentSavedMovies(filterMoviesByDuration(filterMoviesBySymbols(savedMovies, savedMoviesKeyword)).reverse());
          } else {
            // 1.2 если не было поиска
            setCurrentSavedMovies(filterMoviesByDuration(savedMovies).reverse());
          }
        // 2. если фильтр НЕ включён
        } else if (localStorage.getItem('savedMoviesKeyword')) {
          // 2.1 если был поиск по символам
          setCurrentSavedMovies(filterMoviesBySymbols(savedMovies, savedMoviesKeyword).reverse());
        } else {
          // 2.2 если не было поиска
          setCurrentSavedMovies(savedMovies.reverse());
        }
      })
      .catch((e) => {
        throwErrorMessage(true);
      });
  }

  // отфильтровать по длине
  function filterMoviesByDuration(movies) {
    const result = movies.filter((movie) => {
      return movie.duration <= 40;
    });

    if (result.length === 0) {
      throwEmptyMessage(true);
    }
    return result;
  }

  // отфильтровать по символам
  function filterMoviesBySymbols(movies, keyword) {
    const result = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
    });

    if (result.length === 0) {
      throwEmptyMessage(true);
    }
    return result;
  }

  function saveMovie (movie, callback) {
    mainApi.addMovie(movie)
      .then(() => {
        // для того, чтобы получить MovieId и иметь возможность удалить фильм сразу же
        getSavedMovies();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function deleteMovie (movie) {
    mainApi.removeMovie(movie._id)
      .then(() => {
        fillSavedMoviesStorage(savedMoviesStorage
          .filter((savedMovie) => {
            return savedMovie !== movie;
          })
        );

        setCurrentSavedMovies(savedMoviesStorage
          .filter((savedMovie) => {
            return savedMovie !== movie;
          })
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
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
          currentMovies={currentMovies}
          setCurrentMovies={setCurrentMovies}
          saveMovie={saveMovie}
          savedMoviesStorage={savedMoviesStorage}
          searchLimiter={searchLimiter}
          setSearchLimiter={setSearchLimiter}
          increaseSearchLimiter={increaseSearchLimiter}
          isEmpty={isEmpty}
          isError={isError}
          setLoginStatus={setLoginStatus}
          isAuthSent={isAuthSent}
          deleteMovie={deleteMovie}
          moviesStorage={moviesStorage}
          fillMoviesStorage={fillMoviesStorage}
          filterBySearchLimiter={filterBySearchLimiter}
          filterMoviesByDuration={filterMoviesByDuration}
          moviesKeyword={moviesKeyword}
          setMoviesKeyword={setMoviesKeyword}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          openMenu={handleOpenMenu} 
          getSavedMovies={getSavedMovies} 
          currentSavedMovies={currentSavedMovies}
          fillMoviesStorage={fillSavedMoviesStorage}
          deleteMovie={deleteMovie}
          setLoginStatus={setLoginStatus}
          isAuthSent={isAuthSent}
          savedMoviesKeyword={savedMoviesKeyword}
          setSavedMoviesKeyword={setSavedMoviesKeyword}
          findSavedMovies={findSavedMovies}
          isEmpty={isEmpty}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          onEdit={onEdit}
          setEdit={setEdit}
          getUserInfo={getUserInfo}
          openMenu={handleOpenMenu}
          reqError={profileReqError}
          reqErrorText={profileReqErrorText}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
          setLoginStatus={setLoginStatus}
          isAuthSent={isAuthSent}
        />
        <Route exact path="/signup">
          {loggedIn ?
          <Redirect to='/'/>
          : <Register
              isRegister={true}
              greetingText="Добро пожаловать!"
              reqError={regReqError}
              reqErrorText={regReqErrorText}
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
          : <Login
              isAuthorization={true}
              greetingText="Рады видеть!"
              reqError={authReqError}
              reqErrorText={authReqErrorText}
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

      <Menu openMenu={handleOpenMenu} isOpened={isOpened} currentPage="menu" />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
