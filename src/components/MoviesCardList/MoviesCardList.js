import React from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import url from '../../images/test.png';


function MoviesCardList ({ isLoading, isSaved, allMovies }) {

  // временный массив
  const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return(
    <>{isLoading ? <Preloader />
    : <><ul className="movies-card-list">
        {movies.map((movie, i) => {
          return(
            <MoviesCard
              isSaved={isSaved}
              isMarked={false}
              name="33 слова о дизайне"
              duration="107"
              imageUrl={url}
              description="Фильм про бег и жизнь"
              key={i}
            />
          )
        })}
      </ul>
      {movies.length < allMovies && movies.length > 0 && <button className="movies-card-list__button" type="button">Ещё</button>}
      </>
    }</>
  );
}

export default MoviesCardList;
