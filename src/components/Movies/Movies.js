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
      <section>
        <MoviesCardList isLoading={isLoading} isSaved={false} />
        <button className="movies__button" type="button">Ещё</button>
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Movies;