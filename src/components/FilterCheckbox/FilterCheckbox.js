import { useState, useEffect } from 'react';

function FilterCheckbox ({ 
  isSaved,  
  findShortMovies, 
  restoreMovies
}) {

  const [isChecked, check] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`)) {
      check(true);
    }
  }, []);

  function handleCheck(e) {
    if (isChecked) {
      check(false);
      restoreMovies();
    } else {
      check(true);
      findShortMovies();
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
