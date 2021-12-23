import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ 
  openMenu, 
  getSavedMovies, 
  currentSavedMovies, 
  fillMoviesStorage, 
  deleteMovie,
  savedMoviesKeyword,
  setSavedMoviesKeyword,
  findSavedMovies,
  isEmpty,
  findShortSavedMovies,
  restoreSavedMovies
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
        type="savedMovies" 
        fillMoviesStorage={fillMoviesStorage} 
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
          currentMovies={currentSavedMovies} 
          deleteMovie={deleteMovie}
          isEmpty={isEmpty}
        />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default SavedMovies;
