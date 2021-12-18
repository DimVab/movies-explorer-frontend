import { useState, useEffect } from 'react';

function FilterCheckbox ({ fillMoviesStorage, isSaved }) {

  const [isChecked, check] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`)) {
      check(true);
    }
    // if (isSaved && localStorage.getItem('showShortSavedMovies')) {
    // //  если фильтр был оставлен включённым, то при рендере сразу же произойдёт фильтрация
    //   // если фильмы отфильтрованы по поиску, то они будут добавлены в локальное хранилище
    //   if (JSON.parse(localStorage.getItem('filteredSavedMovies'))) {
    //     localStorage.setItem('filteredShortSavedMovies', JSON.stringify(
    //       JSON.parse(localStorage.getItem('filteredSavedMovies'))
    //         .filter((movie) => {
    //           return movie.duration <= 40;
    //         })
    //     ));
    //     fillMoviesStorage((JSON.parse(localStorage.getItem('filteredShortSavedMovies')).reverse()));
    //   } else {
    //     // если пользователь ничего не вводил
    //     localStorage.setItem('shortSavedMovies', JSON.stringify(
    //       JSON.parse(localStorage.getItem('savedMovies'))
    //         .filter((movie) => {
    //           return movie.duration <= 40;
    //         })
    //     ));
    //     console.log(JSON.parse(localStorage.getItem('shortSavedMovies')));
    //     fillMoviesStorage((JSON.parse(localStorage.getItem('shortSavedMovies')).reverse()));
    //  }
    // }
  }, []);

  function handleCheck(e) {
    if (isChecked) {

      check(false);
      localStorage.removeItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`);
      localStorage.removeItem(`${isSaved ? 'shortSavedMovies' : 'shortMovies'}`);
      localStorage.removeItem('filteredShortSavedMovies');
      if (isSaved) {
        if (JSON.parse(localStorage.getItem('filteredSavedMovies'))) {
          fillMoviesStorage(JSON.parse(localStorage.getItem('filteredSavedMovies')).reverse());
        } else {
          fillMoviesStorage(JSON.parse(localStorage.getItem('savedMovies')).reverse());
        }
      } else if (JSON.parse(localStorage.getItem('movies'))) {
        fillMoviesStorage(JSON.parse(localStorage.getItem('movies')));
      }

    } else {

      check(true);
      localStorage.setItem(`${isSaved ? 'showShortSavedMovies' : 'showShortMovies'}`, 'true');
      // проверяем, есть ли вообще фильмы и есть ли среди них короткометражки
      if (JSON.parse(localStorage.getItem(`${isSaved ? 'savedMovies' : 'movies'}`)) && JSON.parse(localStorage.getItem(`${isSaved ? 'savedMovies' : 'movies'}`))
        .filter((movie) => {
          return movie.duration <= 40;
      }).length > 0) 

      {

        if (isSaved) {
          // если фильмы отфильтрованы по поиску, то они будут добавлены в локальное хранилище
          if (JSON.parse(localStorage.getItem('filteredSavedMovies'))) {
            localStorage.setItem('filteredShortSavedMovies', JSON.stringify(
              JSON.parse(localStorage.getItem('filteredSavedMovies'))
                .filter((movie) => {
                  return movie.duration <= 40;
                })
            ));
          } else {
            // если пользователь ничего не вводил
            localStorage.setItem('shortSavedMovies', JSON.stringify(
              JSON.parse(localStorage.getItem('savedMovies'))
                .filter((movie) => {
                  return movie.duration <= 40;
                })
            )); 
          }
        } else {
          localStorage.setItem('shortMovies', JSON.stringify(
            JSON.parse(localStorage.getItem('movies'))
              .filter((movie) => {
                return movie.duration <= 40;
              })
          )); 
        }
        
        if (isSaved) {
          if (JSON.parse(localStorage.getItem('filteredShortSavedMovies'))) {
            // если фильмы были отфильтрованы по поиску, то фильтрация происходит среди них
            fillMoviesStorage(JSON.parse(localStorage.getItem('filteredShortSavedMovies')).reverse());
          } else {
            // иначе фильтрация происхоит по всем фильмам
            fillMoviesStorage(JSON.parse(localStorage.getItem('shortSavedMovies')).reverse());
          }
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
