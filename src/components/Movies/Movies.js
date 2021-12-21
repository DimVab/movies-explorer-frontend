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
  deleteMovie
 }) {

  useEffect(() => {
    // вспоминаются карточки, которые искались ранее
    // #TODO переработать, чтобы карточки не брались из local Storage, а вычислялись
    if (localStorage.getItem('showShortMovies') && localStorage.getItem('shortMovies')) {
      setCurrentMovies(JSON.parse(localStorage.getItem('shortMovies')));
    } else if (localStorage.getItem('movies')) {
      setCurrentMovies(JSON.parse(localStorage.getItem('movies')));
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
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
