import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ loggedIn, isLoading }) {

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} />
    <main className="movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList isLoading={isLoading} />
    </main>
    <Footer />
    </>
  );
}

export default Movies;