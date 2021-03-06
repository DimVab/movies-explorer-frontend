import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
// контекст
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// компоненты с вёрсткой
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// компоненты API
import mainApi from '../../utils/MainApi';
import getMovies from '../../utils/MoviesApi';
// utils
import { errorMessages } from '../../utils/messages';

function App() {

  // общие переменные состояния
  const [isAuthSent, setAuth] = useState(false);
  const [loggedIn, setLoginStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isOpened, openMenu] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const [onEdit, setEdit] = useState(false);
  const [searchLimiter, setSearchLimiter] = useState(12);
  const [successMessage, showSuccessMessage] = useState(false);
  // поисковые слова:
  const [moviesKeyword, setMoviesKeyword] = useState('');
  const [savedMoviesKeyword, setSavedMoviesKeyword] = useState('');
  // переменные состояния ошибок и сообщений
  // регистрации, авторизации и профиля:
  const [profileReqErrorText, setProfileReqErrorText] = useState('');
  const [regReqErrorText, setRegReqErrorText] = useState('');
  const [authReqErrorText, setAuthReqErrorText] = useState('');
  const [profileReqError, showProfileReqError] = useState(false);
  const [regReqError, showRegReqError] = useState(false);
  const [authReqError, showAuthReqError] = useState(false);
  // поиска фильмов:
  const [isError, showErrorMessage] = useState(false);
  const [isMoviesEmpty, showMoviesEmptyMessage] = useState(false);
  const [isSavedMoviesEmpty, showSavedMoviesEmptyMessage] = useState(false);
  // Хранилища фильмов и отображаемых фильмов:
  const [moviesStorage, fillMoviesStorage] = useState([]);
  const [savedMoviesStorage, fillSavedMoviesStorage] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);

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

  function toggleMenu(e) {
    isOpened ? openMenu(false) : openMenu(true);
  }

  function handleResize() {
    if (window.screen.width > 1024) {
      setSearchLimiter(12);
    } else if (window.screen.width > 525) {
      setSearchLimiter(8);
    } else {
      setSearchLimiter(5);
    }
  }

  function increaseSearchLimiter() {
    if (window.screen.width > 1024) {
      setSearchLimiter(searchLimiter + 3);
    } else {
      setSearchLimiter(searchLimiter + 2);
    }
  }

  // Функции, связанные с регистрацией и авторизацией:

  function handleRegister(name, email, password) {
    showRegReqError(false);
    mainApi.register(name, email, password)
      .then(() => {
        handleAuthorize(email, password);
      })
      .catch((err) => {
        showRegReqError(true);
        if (err === '409') {
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
        if (err === '401') {
          setAuthReqErrorText(errorMessages.sign.unathorized);
        } else if (err.name === 'TypeError') {
          setAuthReqErrorText(errorMessages.sign.connect);
        } else if (err === '400') { 
          setAuthReqErrorText(errorMessages.sign.validation);
        } else {
          setAuthReqErrorText(errorMessages.sign.default);
        }
        console.log(`Ошибка ${err}`);
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
    showSuccessMessage(false);
    mainApi.editUserInfo(userData)
    .then((newUserInfo) => {
      setUserInfo({name: newUserInfo.name, email: newUserInfo.email});
      setEdit(false);
      showSuccessMessage(true);
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
      console.log(`Ошибка ${err}`);
    });
  }

  // функции, связанные с поиском, сохранением и удалением фильмов:

  function findMovies(moviesKeyword) {
    showMoviesEmptyMessage(false);
    showErrorMessage(false);
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
        // если включён фильтр короткометражек:
        if (localStorage.getItem('showShortMovies')) {
          setCurrentMovies(filterBySearchLimiter(filterMoviesByDuration(filteredMovies)));
        } else {
          setCurrentMovies(filterBySearchLimiter(filteredMovies));
        }
      })
      .catch((err) => {
        showErrorMessage(true);
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }

  function filterBySearchLimiter(movies) {
    return movies.filter((movie, i) => {
      return i < searchLimiter;
    });
  }

  function findSavedMovies(savedMoviesKeyword) {
    showSavedMoviesEmptyMessage(false);
    localStorage.setItem('savedMoviesKeyword', savedMoviesKeyword);
    if (localStorage.getItem('showShortSavedMovies')) {
      setCurrentSavedMovies(filterSavedMoviesByDuration(filterSavedMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword)));
    } else {
      setCurrentSavedMovies(filterSavedMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword));
    }
  }

  function getSavedMovies(savedMoviesKeyword) {
    if (localStorage.getItem('savedMoviesKeyword') === '') {
      localStorage.removeItem('savedMoviesKeyword');
    } else if (localStorage.getItem('savedMoviesKeyword')) {
      setSavedMoviesKeyword(localStorage.getItem('savedMoviesKeyword'));
    }

    mainApi.getSavedMovies()
      .then((savedMovies) => {
        // заполнить хранилище сохранённых фильмов
        fillSavedMoviesStorage(savedMovies.reverse());
        // 1. если включён фильтр по короткометражкам
        if (localStorage.getItem('showShortSavedMovies')) {
          // 1.1 если был поиск по символам
          if (localStorage.getItem('savedMoviesKeyword')) {
            // фильтруем и по символаи и по длительности
            setCurrentSavedMovies(filterSavedMoviesByDuration(filterSavedMoviesBySymbols(savedMovies, savedMoviesKeyword)));
          } else {
            // 1.2 если не было поиска
            setCurrentSavedMovies(filterSavedMoviesByDuration(savedMovies));
          }
        // 2. если фильтр НЕ включён
        } else if (localStorage.getItem('savedMoviesKeyword')) {
          // 2.1 если был поиск по символам
          setCurrentSavedMovies(filterSavedMoviesBySymbols(savedMovies, savedMoviesKeyword));
        } else {
          // 2.2 если не было поиска
          setCurrentSavedMovies(savedMovies);
        }
      })
      .catch(() => {
        console.log(errorMessages.movies.connect);
        showErrorMessage(true);
      });
  }

  function findShortMovies() {
    localStorage.setItem('showShortMovies', 'true');
    setCurrentMovies(filterBySearchLimiter(filterMoviesByDuration(moviesStorage)));
  }

  function restoreMovies() {
    localStorage.removeItem('showShortMovies');
    setCurrentMovies(filterBySearchLimiter(moviesStorage));
    if (filterBySearchLimiter(moviesStorage).length > 0) {
      showMoviesEmptyMessage(false);
    }
  }

  function findShortSavedMovies() {
    localStorage.setItem('showShortSavedMovies', 'true');
    if (localStorage.getItem('savedMoviesKeyword')) {
      setCurrentSavedMovies(filterSavedMoviesByDuration(filterSavedMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword)));
    } else {
      setCurrentSavedMovies(filterSavedMoviesByDuration(savedMoviesStorage));
    }
  }

  function restoreSavedMovies() {
    localStorage.removeItem('showShortSavedMovies');
    if (localStorage.getItem('savedMoviesKeyword')) {
      setCurrentSavedMovies(filterSavedMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword));
      if (filterBySearchLimiter(filterSavedMoviesBySymbols(savedMoviesStorage, savedMoviesKeyword)).length > 0) {
        showSavedMoviesEmptyMessage(false);
      }
    } else {
      setCurrentSavedMovies(savedMoviesStorage);
      showSavedMoviesEmptyMessage(false);
    }
  }

  // отфильтровать по длине
  function filterMoviesByDuration(movies) {
    const result = movies.filter((movie) => {
      return movie.duration <= 40;
    });

    if (result.length === 0) {
      showMoviesEmptyMessage(true);
    }
    return result;
  }

  function filterSavedMoviesByDuration(movies) {
    const result = movies.filter((movie) => {
      return movie.duration <= 40;
    });

    if (result.length === 0) {
      showSavedMoviesEmptyMessage(true);
    }
    return result;
  }

  // отфильтровать по символам
  function filterMoviesBySymbols(movies, keyword) {
    const result = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
    });

    if (result.length === 0) {
      showMoviesEmptyMessage(true);
    }
    return result;
  }

  function filterSavedMoviesBySymbols(movies, keyword) {
    const result = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
    });

    if (result.length === 0) {
      showSavedMoviesEmptyMessage(true);
    }
    return result;
  }

  function saveMovie(movie) {
    mainApi.addMovie(movie)
      .then(() => {
        // для того, чтобы получить MovieId и иметь возможность удалить фильм сразу же
        mainApi.getSavedMovies()
        .then((savedMovies) => {
          fillSavedMoviesStorage(savedMovies.reverse());
        })
        .catch((e) => {
          console.log(() => {
            console.log(errorMessages.movies.connect);
          });
        });
      })
      .catch((err) => {
        if (err === '400') {
          console.log(errorMessages.movies.validation);
        } else {
          console.log(`Ошибка ${err}`);
        }
      });
  }

  function deleteMovie(movie) {
    mainApi.removeMovie(movie._id)
      .then(() => {
        const updatedMoviesStorage = savedMoviesStorage
          .filter((savedMovie) => {
            return savedMovie !== movie;
          });

        fillSavedMoviesStorage(updatedMoviesStorage);
        // в зависимости от состояния фильтров переделывается отображение сохранённых фильмов
        if (localStorage.getItem('showShortSavedMovies')) {
          // 1.1 если был поиск по символам
          if (localStorage.getItem('savedMoviesKeyword')) {
            // фильтруем и по символаи и по длительности
            setCurrentSavedMovies(filterSavedMoviesByDuration(filterSavedMoviesBySymbols(updatedMoviesStorage, savedMoviesKeyword)));
          } else {
            // 1.2 если не было поиска
            setCurrentSavedMovies(filterSavedMoviesByDuration(updatedMoviesStorage));
          }
        // 2. если фильтр НЕ включён
        } else if (localStorage.getItem('savedMoviesKeyword')) {
          // 2.1 если был поиск по символам
          setCurrentSavedMovies(filterSavedMoviesBySymbols(updatedMoviesStorage, savedMoviesKeyword));
        } else {
          // 2.2 если не было поиска
          setCurrentSavedMovies(updatedMoviesStorage);
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div className="app"><Switch>
        <ProtectedRoute
          // для ProtectedRoute:
          path="/movies"
          component={Movies}
          isAuthSent={isAuthSent}
          loggedIn={loggedIn}
          // для Movies
          openMenu={toggleMenu}
          setCurrentMovies={setCurrentMovies}
          fillMoviesStorage={fillMoviesStorage}
          filterBySearchLimiter={filterBySearchLimiter}
          filterMoviesByDuration={filterMoviesByDuration}
          findMovies={findMovies}
          moviesKeyword={moviesKeyword}
          setMoviesKeyword={setMoviesKeyword}
          isLoading={isLoading}
          isEmpty={isMoviesEmpty}
          isError={isError}
          currentMovies={currentMovies}
          saveMovie={saveMovie}
          searchLimiter={searchLimiter}
          increaseSearchLimiter={increaseSearchLimiter}
          savedMoviesStorage={savedMoviesStorage}
          deleteMovie={deleteMovie}
          moviesStorage={moviesStorage}
          findShortMovies={findShortMovies}
          restoreMovies={restoreMovies}
        />
        <ProtectedRoute
          // для ProtectedRoute:
          path="/saved-movies"
          component={SavedMovies}
          isAuthSent={isAuthSent}
          loggedIn={loggedIn}
          // для SavedMovies
          openMenu={toggleMenu} 
          getSavedMovies={getSavedMovies} 
          currentSavedMovies={currentSavedMovies}
          deleteMovie={deleteMovie}
          savedMoviesKeyword={savedMoviesKeyword}
          setSavedMoviesKeyword={setSavedMoviesKeyword}
          findSavedMovies={findSavedMovies}
          isEmpty={isSavedMoviesEmpty}
          findShortSavedMovies={findShortSavedMovies}
          restoreSavedMovies={restoreSavedMovies}
        />
        <ProtectedRoute
          // для ProtectedRoute:
          path="/profile"
          component={Profile}
          isAuthSent={isAuthSent}
          loggedIn={loggedIn}
          // Для Profile:
          onEdit={onEdit}
          setEdit={setEdit}
          openMenu={toggleMenu}
          reqError={profileReqError}
          reqErrorText={profileReqErrorText}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
          successMessage={successMessage}
          showSuccessMessage={showSuccessMessage}
        />
        <Route exact path="/signup">
          {loggedIn ?
          <Redirect to='/'/>
          : <Register
              isRegister={true}
              greetingText="Добро пожаловать!"
              buttonText="Зарегистрироваться"
              link="/signin"
              redirectText="Уже зарегистрированы?"
              linkText="Войти"
              onSubmit={handleRegister}
              reqError={regReqError}
              reqErrorText={regReqErrorText}
          />}
        </Route>
        <Route exact path="/signin">
          {loggedIn ?
          <Redirect to='/'/>
          : <Login
              isAuthorization={true}
              greetingText="Рады видеть!"
              buttonText="Войти"
              link="/signup"
              redirectText="Ещё не зарегистрированы?"
              linkText="Регистрация"
              onSubmit={handleAuthorize}
              reqError={authReqError}
              reqErrorText={authReqErrorText}
          />}
        </Route>
        <Route exact path="/">
          <Main loggedIn={loggedIn} openMenu={toggleMenu}/>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      <Menu openMenu={toggleMenu} isOpened={isOpened} currentPage="menu" />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
