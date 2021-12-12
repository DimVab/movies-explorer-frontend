import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ loggedIn, openMenu }) {

  return(
    <div className="saved-movies">
    <Header bgColor="light" loggedIn={loggedIn} openMenu={openMenu} />
    <main className="saved-movies__container">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList isLoading={false} isSaved={true} movies='0' />
    </main>
    <Footer />
    </div>
  );
}

export default SavedMovies;
