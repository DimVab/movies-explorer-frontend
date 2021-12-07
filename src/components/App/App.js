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

  return (
    <><Switch>
      <Route exact path="/sign-up">
        <Sign />
      </Route>
      <Route exact path="/sign-in">
        <Sign />
      </Route>
      <Route exact path="/">
        <Main loggedIn={loggedIn} />
      </Route>
      <Route exact path="/movies">
        <Movies loggedIn={loggedIn} isLoading={isLoading} />
      </Route>
      <Route exact path="/saved-movies">
        <SavedMovies loggedIn={true} isLoading={isLoading} />
      </Route>
      <Route exact path="/profile">
        <Profile loggedIn={loggedIn} userInfo={userInfo} />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>

    <Menu isOpened={isOpened} currentPage="menu" /></>
  );
}

export default App;
