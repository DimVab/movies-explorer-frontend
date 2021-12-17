import { useState, useEffect } from 'react';

function SearchForm ({ findMovies, type, fillMoviesStorage }) {

  useEffect(() => {
    if (type === 'movies' && localStorage.getItem('moviesKeyword')) {
      setKeyword(localStorage.getItem('moviesKeyword'));
    }
    if (type === 'savedMovies' && localStorage.getItem('savedMoviesKeyword')) {
      setKeyword(localStorage.getItem('savedMoviesKeyword'));
    }
  }, []);

  const [keyword, setKeyword] = useState('');

  function handleSubmit (e) {
    e.preventDefault();
    if (type === 'movies') {
      localStorage.setItem('moviesKeyword', keyword);
      findMovies(keyword);
    }
    if (type === 'savedMovies') {

      localStorage.setItem('savedMoviesKeyword', keyword);
      localStorage.setItem('filteredSavedMovies', JSON.stringify(
        JSON.parse(localStorage.getItem('savedMovies'))
          .filter((movie) => {
            return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
          })
      ));
      fillMoviesStorage(JSON.parse(localStorage.getItem('filteredSavedMovies')));

      // если включён фильтр короткометражек
      // TODO
      if (localStorage.getItem('showShortSavedMovies')) {
        localStorage.setItem('filteredShortSavedMovies', JSON.stringify(JSON.parse(localStorage.getItem('filteredSavedMovies'))
          .filter((movie) => {
            return movie.duration <= 40;
          })
        ));
        fillMoviesStorage(JSON.parse(localStorage.getItem('filteredShortSavedMovies')));
      }
    }
  }

  function handleChange (e) {
    setKeyword(e.target.value);
  }

  return(
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-form__input" placeholder="Фильм" type="text" name="movie" maxLength="50" required={type === "movies"} value={keyword} onChange={handleChange}/>
        <input type="submit" className="search-form__submit" value="Найти"/>
      </form>
    </>
  );
}

export default SearchForm;
