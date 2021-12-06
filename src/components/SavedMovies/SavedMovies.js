import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ loggedIn, isLoading }) {

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} />
    <main className="saved-movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList isLoading={isLoading} isSaved={true} />
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;