import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies ({ loggedIn, isLoading, allMovies, openMenu }) {

  return(
    <div className="movies">
    <Header bgColor="light" loggedIn={loggedIn} openMenu={openMenu} />
    <main className="movies-container">
      <SearchForm />
      <FilterCheckbox />
      <section>
        <MoviesCardList isLoading={isLoading} isSaved={false} allMovies={allMovies} />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;