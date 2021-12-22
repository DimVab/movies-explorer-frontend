import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ 
  isLoading, 
  openMenu, 
  findMovies, 
  currentMovies,
  setCurrentMovies, 
  saveMovie, 
  savedMovies, 
  searchLimiter, 
  increaseSearchLimiter, 
  isEmpty, 
  isError, 
  throwEmptyMessage,
  savedMoviesStorage,
  deleteMovie,
  moviesStorage,
  fillMoviesStorage,
  filterBySearchLimiter,
  filterMoviesByDuration
 }) {
  useEffect(() => {
    // здесь меняется количество отображаемых фильмов в зависимости от размеров экрана
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
        findMovies={findMovies} type="movies"
      />
      <FilterCheckbox 
        setCurrentMovies={setCurrentMovies} 
        throwEmptyMessage={throwEmptyMessage} 
        currentMovies={currentMovies}
      />
      <section className="movies__section">
        <MoviesCardList 
          isLoading={isLoading} 
          isSaved={false} 
          currentMovies={currentMovies} 
          saveMovie={saveMovie} 
          savedMovies={savedMovies}
          searchLimiter={searchLimiter}
          increaseSearchLimiter={increaseSearchLimiter}
          isError={isError}
          isEmpty={isEmpty}
          savedMoviesStorage={savedMoviesStorage}
          deleteMovie={deleteMovie}
          moviesStorage={moviesStorage}
          filterMoviesByDuration={filterMoviesByDuration}
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
