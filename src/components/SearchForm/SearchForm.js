function SearchForm () {

  return(
    <>
      <form className="search-form">
        <input className="search-form__input" placeholder="Фильм" type="text" name="movie" minLength="2" maxLength="50" required/>
        <input type="submit" className="search-form__submit" value="Найти" />
      </form>
    </>
  );
}

export default SearchForm;