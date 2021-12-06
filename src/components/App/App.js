import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Menu from '../Menu/Menu';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {

  return (
    <><Switch>
      <Route exact path="/">
        <Main loggedIn={true} />
      </Route>
      <Route exact path="/movies">
        <Movies loggedIn={true} isLoading={false} />
      </Route>
      <Route exact path="/saved-movies">
        <SavedMovies loggedIn={true} isLoading={false} />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>

    <Menu isOpened={false} currentPage="menu" /></>
  );
}

export default App;
