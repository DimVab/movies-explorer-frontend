import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ isLoading, openMenu, findMovies, moviesStorage, fillMoviesStorage, saveMovie, savedMovies, unmarkMovie, searchLimiter, setSearchLimiter, increaseSearchLimiter }) {

  useEffect(() => {
    // вспоминаются карточки, которые искались ранее
    if (localStorage.getItem('showShortMovies') && localStorage.getItem('shortMovies')) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies')));
    } else if (localStorage.getItem('movies')) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
    }

    // вспоминаются сохранённые данные о кол-ве карточек в выдаче. Если их нет, то предустанавливаются стандартные
    if (window.screen.width > 1024) {
      localStorage.getItem('1280CardsLimiter') ? setSearchLimiter(Number(localStorage.getItem('1280CardsLimiter'))) : setSearchLimiter(12);
    } else if (window.screen.width > 525) {
      localStorage.getItem('768CardsLimiter') ? setSearchLimiter(Number(localStorage.getItem('768CardsLimiter'))) : setSearchLimiter(8);
    } else if (window.screen.width <= 525) {
      localStorage.getItem('320CardsLimiter') ? setSearchLimiter(Number(localStorage.getItem('320CardsLimiter'))) : setSearchLimiter(5);
    }
  }, []);

  return(
    <div className="movies">
    <Header bgColor="light" loggedIn={true} openMenu={openMenu} />
    <main className="movies-container">
      <SearchForm findMovies={findMovies} type="movies" />
      <FilterCheckbox fillMoviesStorage={fillMoviesStorage} />
      <section>
        <MoviesCardList 
        isLoading={isLoading} 
        isSaved={false} 
        movies={moviesStorage} 
        saveMovie={saveMovie} 
        savedMovies={savedMovies}
        unmarkMovie={unmarkMovie}
        searchLimiter={searchLimiter}
        increaseSearchLimiter={increaseSearchLimiter}
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
