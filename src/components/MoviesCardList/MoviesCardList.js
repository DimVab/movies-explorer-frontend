import React from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import url from '../../images/test.png';


function MoviesCardList ({ isLoading, isSaved }) {

  // временный массив
  const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return(
    <>{isLoading ? <Preloader />
    : <ul className="movies-card-list">
        {movies.map((movie) => {
          return(
            <MoviesCard
            isSaved={isSaved}
            isMarked={false}
            name="Правильные пацаны"
            duration="184"
            imageUrl={url}
            description="Фильм про мафию"
          />
          )
        })}
      </ul>
  }</>
  );
}

export default MoviesCardList;
