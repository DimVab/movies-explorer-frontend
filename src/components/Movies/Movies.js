import { useState, useEffect} from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import getMovies from '../../utils/MoviesApi';

function Movies ({ loggedIn, isLoading, movies, openMenu }) {

  const [localMovies, setLocalMovies] = useState([]);

  useEffect(() => {
    getMovies().then((movies) => {
      setLocalMovies(movies);
    });
  }, []);


  return(
    <div className="movies">
    <Header bgColor="light" loggedIn={loggedIn} openMenu={openMenu} />
    <main className="movies-container">
      <SearchForm />
      <FilterCheckbox />
      <section>
        <MoviesCardList isLoading={isLoading} isSaved={false} movies={localMovies} />
      </section>
    </main>
    <Footer />
    </div>
  );
}

export default Movies;
