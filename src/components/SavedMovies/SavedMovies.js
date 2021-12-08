import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies ({ loggedIn, openMenu }) {

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} openMenu={openMenu} />
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