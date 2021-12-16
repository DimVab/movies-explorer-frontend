import { useState } from 'react';

function SearchForm ({ findMovies }) {

  const [keyword, setKeyword] = useState('');

  function handleSubmit (e) {
    e.preventDefault();
    findMovies(keyword);
  }

  function handleChange (e) {
    setKeyword(e.target.value);
  }

  return(
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-form__input" placeholder="Фильм" type="text" name="movie" minLength="2" maxLength="50" required value={keyword} onChange={handleChange}/>
        <input type="submit" className="search-form__submit" value="Найти"/>
      </form>
    </>
  );
}

export default SearchForm;
