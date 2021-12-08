import { useState } from 'react';

function FilterCheckbox () {

  const [isChecked, check] = useState(false);

  function handleCheck(e) {
    isChecked ? check(false) : check(true);
  }

  return(
    <form className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input className="filter-checkbox__button-hidden" type="checkbox" name="filter" value={isChecked} onChange={handleCheck} />
        <span className="filter-checkbox__button-visible">
          <div className="filter-checkbox__round"></div>
        </span>
        Короткометражки
      </label>
    </form>
  );
}

export default FilterCheckbox;