import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ isLoading, openMenu, findMovies, moviesStorage, fillMoviesStorage }) {

  useEffect(() => {
    if (localStorage.getItem('showShortMovies') && localStorage.getItem('shortMovies')) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies')));
    } else if (localStorage.getItem('movies')) {
      fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
    }
  }, []);

  return(
    <div className="movies">
    <Header bgColor="light" loggedIn={true} openMenu={openMenu} />
    <main className="movies-container">
      <SearchForm findMovies={findMovies} />
      <FilterCheckbox fillMoviesStorage={fillMoviesStorage} moviesStorage={moviesStorage} findMovies={findMovies} />
      <section>
        <MoviesCardList isLoading={isLoading} isSaved={false} movies={moviesStorage} />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
