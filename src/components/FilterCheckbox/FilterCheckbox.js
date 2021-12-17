import { useState, useEffect } from 'react';

function FilterCheckbox ({ fillMoviesStorage, isSaved }) {

  const [isChecked, check] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`)) {
      check(true);
    }
  }, []);

  function handleCheck(e) {
    if (isChecked) {

      check(false);
      localStorage.removeItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`);
      localStorage.removeItem(`${isSaved ? 'shortSavedMovies' : 'shortMovies'}`);
      if (isSaved) {
        fillMoviesStorage(JSON.parse(localStorage.getItem('savedMovies')).reverse());
      } else {
        fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
      }

    } else {

      check(true);
      localStorage.setItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`, 'true');
      if (JSON.parse(localStorage.getItem(`${isSaved ? 'savedMovies' : 'movies'}`))
      .filter((movie) => {
        return movie.duration <= 40;
      }).length > 0) 

      {
        localStorage.setItem(`${isSaved ? 'shortSavedMovies' : 'shortMovies'}`, JSON.stringify(
          JSON.parse(localStorage.getItem(`${isSaved ? 'savedMovies' : 'movies'}`))
            .filter((movie) => {
              return movie.duration <= 40;
            })
        ));
        if (isSaved) {
          fillMoviesStorage(JSON.parse(localStorage.getItem('shortSavedMovies')).reverse());
        } else {
          fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies')));
        }
      } /* else показать надпись "ничего не найдено" */
    }
  }

  return(
    <form className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input className="filter-checkbox__button-hidden" type="checkbox" name="filter" value={isChecked} checked={isChecked} onChange={handleCheck} />
        <span className="filter-checkbox__button-visible">
          <div className="filter-checkbox__round"></div>
        </span>
        Короткометражки
      </label>
    </form>
  );
}

export default FilterCheckbox;
