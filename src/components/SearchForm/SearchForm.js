import { useState, useEffect } from 'react';

function SearchForm ({ findMovies, type, fillMoviesStorage, throwEmptyMessage }) {

  useEffect(() => {
    if (type === 'movies' && localStorage.getItem('moviesKeyword')) {
      setKeyword(localStorage.getItem('moviesKeyword'));
    }
    if (type === 'savedMovies' && localStorage.getItem('savedMoviesKeyword')) {
      setKeyword(localStorage.getItem('savedMoviesKeyword'));
    }
  }, []);

  const [keyword, setKeyword] = useState('');
  const [searchErrText, showSearchErrorText] = useState(false);

  useEffect(() => {
    if (keyword.length > 0) {
      showSearchErrorText(false);
    }
  }, [keyword]);

  function handleSubmit (e) {
    e.preventDefault();
    if (type === 'movies') {
      showSearchErrorText(false);
      localStorage.setItem('moviesKeyword', keyword);
      if (keyword.length === 0) {
        showSearchErrorText(true);
        return;
      }
      findMovies(keyword);
    }
    if (type === 'savedMovies') {

      throwEmptyMessage(false);
      localStorage.setItem('savedMoviesKeyword', keyword);
      localStorage.setItem('filteredSavedMovies', JSON.stringify(
        JSON.parse(localStorage.getItem('savedMovies'))
          .filter((movie) => {
            return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
          })
      ));
      fillMoviesStorage(JSON.parse(localStorage.getItem('filteredSavedMovies')).reverse());
      if (JSON.parse(localStorage.getItem('filteredSavedMovies')).length === 0) {
        throwEmptyMessage(true);
        return;
      }

      // если включён фильтр короткометражек
      if (localStorage.getItem('showShortSavedMovies')) {
        localStorage.setItem('filteredShortSavedMovies', JSON.stringify(JSON.parse(localStorage.getItem('filteredSavedMovies'))
          .filter((movie) => {
            return movie.duration <= 40;
          })
        ));
        fillMoviesStorage(JSON.parse(localStorage.getItem('filteredShortSavedMovies')).reverse());
      }
    }
  }

  function handleChange (e) {
    setKeyword(e.target.value);
  }

  return(
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-form__input" placeholder="Фильм" type="text" name="movie" maxLength="50" value={keyword} onChange={handleChange}/>
        <input type="submit" className="search-form__submit" value="Найти" disabled={searchErrText}/>
        <p className="search-form__validation-message">{searchErrText && `Нужно ввести ключевое слово`}</p>
      </form>
    </>
  );
}

export default SearchForm;
