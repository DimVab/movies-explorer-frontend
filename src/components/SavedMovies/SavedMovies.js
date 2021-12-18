import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ openMenu, getSavedMovies, savedMovies, fillMoviesStorage, deleteMovie }) {

  useEffect(() => {
    if (localStorage.getItem('savedMoviesKeyword') === '') {
      localStorage.removeItem('filteredSavedMovies');
    }
    // нужно для того, чтобы получать id добавленных фильмов
    getSavedMovies();
  }, []);

  return(
    <div className="saved-movies">
    <Header bgColor="light" loggedIn={true} openMenu={openMenu} />
    <main className="saved-movies__container">
      <SearchForm type="savedMovies" fillMoviesStorage={fillMoviesStorage} />
      <FilterCheckbox fillMoviesStorage={fillMoviesStorage} isSaved={true} />
      <MoviesCardList 
        isLoading={false} 
        isSaved={true} 
        movies={savedMovies} 
        deleteMovie={deleteMovie} 
      />
    </main>
    <Footer />
    </div>
  );
}

export default SavedMovies;
