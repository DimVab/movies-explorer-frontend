import { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ 
  openMenu, 
  getSavedMovies, 
  // для searchForm:
  savedMoviesKeyword,
  setSavedMoviesKeyword,
  findSavedMovies,
  // для filterCheckbox:
  findShortSavedMovies,
  restoreSavedMovies,
  // для moviesCardList:
  isEmpty,
  currentSavedMovies,
  deleteMovie
 }) {
  
  useEffect(() => {
    // нужно для того, чтобы получать id добавленных фильмов
    getSavedMovies(savedMoviesKeyword);
  }, []);

  return(
    <div className="saved-movies">
    <Header 
      bgColor="light" 
      loggedIn={true} 
      openMenu={openMenu} 
    />
    <main className="saved-movies__container">
      <SearchForm 
        isSaved={true}
        keyword={savedMoviesKeyword}
        setKeyword={setSavedMoviesKeyword}
        findMovies={findSavedMovies}
      />
      <FilterCheckbox 
        isSaved={true} 
        findShortMovies={findShortSavedMovies}
        restoreMovies={restoreSavedMovies}
      />
      <section className="saved-movies__section">
        <MoviesCardList 
          isLoading={false} 
          isSaved={true}
          isEmpty={isEmpty}
          currentMovies={currentSavedMovies} 
          deleteMovie={deleteMovie}
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default SavedMovies;
