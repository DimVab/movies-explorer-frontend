import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import url from '../../images/test.png';


function MoviesCardList ({ isLoading, isSaved, movies }) {

  // временный массив

  return(
    <>{isLoading ? <Preloader />
    : <><ul className="movies-card-list">
        {movies.map((movie, i) => {
          return(
            <MoviesCard
              isSaved={isSaved}
              isMarked={false}
              name={movie.nameRU}
              duration={movie.duration}
              imageUrl={movie.image.url}
              description={movie.description}
              link={movie.trailerLink}
              key={movie.id}
            />
          )
        })}
      </ul>
      {/* {movies.length > Allmovies.length > 0 && <button className="movies-card-list__button" type="button">Ещё</button>} */}
      </>
    }</>
  );
}

export default MoviesCardList;
