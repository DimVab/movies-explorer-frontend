import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ openMenu, getSavedMovies, savedMovies, fillSavedMoviesStorage, deleteMovie }) {

  useEffect(() => {
    getSavedMovies();
  }, []);

  return(
    <div className="saved-movies">
    <Header bgColor="light" loggedIn={true} openMenu={openMenu} />
    <main className="saved-movies__container">
      <SearchForm type="savedMovies" fillSavedMoviesStorage={fillSavedMoviesStorage} />
      <FilterCheckbox />
      <MoviesCardList isLoading={false} isSaved={true} movies={savedMovies} deleteMovie={deleteMovie} />
    </main>
    <Footer />
    </div>
  );
}

export default SavedMovies;
