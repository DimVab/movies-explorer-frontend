import { useState, useEffect } from 'react';

function SearchForm ({ 
  findMovies, 
  type,
  keyword,
  setKeyword,
  throwEmptyMessage
 }) {

  useEffect(() => {
    if (type === 'movies' && localStorage.getItem('moviesKeyword')) {
      setKeyword(localStorage.getItem('moviesKeyword'));
    }
    if (type === 'savedMovies' && localStorage.getItem('savedMoviesKeyword')) {
      setKeyword(localStorage.getItem('savedMoviesKeyword'));
    }
  }, []);

  const [searchErrText, showSearchErrorText] = useState(false);

  useEffect(() => {
    if (keyword.length > 0) {
      showSearchErrorText(false);
    }
  }, [keyword]);

  function handleSubmit (e) {
    e.preventDefault();
    if (type === 'movies' && keyword.length === 0) {
      showSearchErrorText(true);
      return;
    }
    findMovies(keyword, throwEmptyMessage(true));
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
