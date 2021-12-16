import { useState, useEffect } from 'react';

function FilterCheckbox ({ moviesStorage, fillMoviesStorage, findMovies }) {

  const [isChecked, check] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('showShortMovies')) {
      check(true);
    }
  }, []);

  function handleCheck(e) {
    if (isChecked) {
      check(false);
      localStorage.removeItem('showShortMovies');
      localStorage.removeItem('shortMovies');
      fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
    } else {
      check(true);
      localStorage.setItem('showShortMovies', 'true');
      if (JSON.parse(localStorage.getItem('movies'))
      .filter((movie) => {
        return movie.duration <= 40;
      }).length > 0) {
        localStorage.setItem('shortMovies', JSON.stringify(
          JSON.parse(localStorage.getItem('movies'))
            .filter((movie) => {
              return movie.duration <= 40;
            })
        ));
        fillMoviesStorage(JSON.parse(localStorage.getItem('shortMovies')));
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
