import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ loggedIn, isLoading, allMovies }) {

  return(
    <>
    <Header bgColor="light" loggedIn={loggedIn} />
    <main className="movies">
      <SearchForm />
      <FilterCheckbox />
      <section>
        <MoviesCardList isLoading={isLoading} isSaved={false} allMovies={allMovies} />
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Movies;