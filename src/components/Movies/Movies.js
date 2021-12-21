import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ isLoading, openMenu, findMovies, moviesStorage, fillMoviesStorage, saveMovie, savedMovies, unmarkMovie, searchLimiter, increaseSearchLimiter, isEmpty, isError, throwEmptyMessage }) {

  useEffect(() => {
    // вспоминаются карточки, которые искались ранее
    if (localStorage.getItem('showShortMovies') && localStorage.getItem('shortMovies')) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies')));
    } else if (localStorage.getItem('movies')) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
    }
  }, []);

  return(
    <div className="movies">
    <Header bgColor="light" 
      loggedIn={true} 
      openMenu={openMenu} 
    />
    <main className="movies-container">
      <SearchForm 
        findMovies={findMovies} type="movies" 
      />
      <FilterCheckbox 
        fillMoviesStorage={fillMoviesStorage} 
        throwEmptyMessage={throwEmptyMessage} 
        moviesStorage={moviesStorage} 
      />
      <section className="movies__section">
        <MoviesCardList 
          isLoading={isLoading} 
          isSaved={false} 
          movies={moviesStorage} 
          saveMovie={saveMovie} 
          savedMovies={savedMovies}
          unmarkMovie={unmarkMovie}
          searchLimiter={searchLimiter}
          increaseSearchLimiter={increaseSearchLimiter}
          isError={isError}
          isEmpty={isEmpty}
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
