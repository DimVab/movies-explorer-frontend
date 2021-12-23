import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ 
  openMenu,
  setCurrentMovies,
  fillMoviesStorage,
  filterBySearchLimiter,
  filterMoviesByDuration,
  // для searchForm:
  findMovies,
  moviesKeyword,
  setMoviesKeyword,
  // для filterCheckbox:
  findShortMovies,
  restoreMovies,
  // для moviesCardList:
  isLoading, 
  isEmpty, 
  isError,
  currentMovies,
  saveMovie, 
  searchLimiter, 
  increaseSearchLimiter, 
  savedMoviesStorage,
  deleteMovie,
  moviesStorage,
 }) {

  useEffect(() => {
    // здесь меняется количество отображаемых фильмов в зависимости от размеров экрана, а также "вспоминаются" фильмы при перезагрузке
    if (localStorage.getItem('showShortMovies') && JSON.parse(localStorage.getItem('movies'))) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
      setCurrentMovies(filterBySearchLimiter(filterMoviesByDuration(JSON.parse(localStorage.getItem('movies')))));
    } else if(JSON.parse(localStorage.getItem('movies'))) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
      setCurrentMovies(filterBySearchLimiter(JSON.parse(localStorage.getItem('movies'))));
    }
    // запоминаем количество отображаемых фильмов
    localStorage.setItem('currentSearchLimiter', searchLimiter);
  }, [searchLimiter]);

  return(
    <div className="movies">
    <Header bgColor="light" 
      loggedIn={true} 
      openMenu={openMenu} 
    />
    <main className="movies-container">
      <SearchForm 
        findMovies={findMovies}
        keyword={moviesKeyword}
        setKeyword={setMoviesKeyword}
      />
      <FilterCheckbox 
        findShortMovies={findShortMovies}
        restoreMovies={restoreMovies}
      />
      <section className="movies__section">
        <MoviesCardList 
          isSaved={false} 
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          currentMovies={currentMovies} 
          saveMovie={saveMovie} 
          searchLimiter={searchLimiter}
          increaseSearchLimiter={increaseSearchLimiter}
          savedMoviesStorage={savedMoviesStorage}
          deleteMovie={deleteMovie}
          moviesStorage={moviesStorage}
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
