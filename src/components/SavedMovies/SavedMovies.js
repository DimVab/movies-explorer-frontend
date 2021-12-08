import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ loggedIn }) {

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} />
    <main className="saved-movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList isLoading={false} isSaved={true} allMovies={undefined} />
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;