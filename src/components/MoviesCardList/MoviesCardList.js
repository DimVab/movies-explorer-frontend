import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import { errorMessages, messages } from '../../utils/messages';

function MoviesCardList ({ 
  isError, 
  isEmpty,
  isLoading, 
  isSaved, 
  currentMovies,
  savedMoviesStorage,
  saveMovie, 
  deleteMovie, 
  searchLimiter, 
  increaseSearchLimiter,
  moviesStorage
 }) {

  const [maximumMovies, setMaximumMovies] = useState(0);

  function filterMoviesByDuration(movies) {
    return movies.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  useEffect(() => {
    if (!isSaved) {
      if (localStorage.getItem('showShortMovies')) {
        setMaximumMovies(filterMoviesByDuration(moviesStorage).length);
      } else if (moviesStorage.length > 0) {
      }
    }
  }, [moviesStorage]);

  return(
    <>
    {isError && <p className="movies-card-list__message movies-card-list__message_type_error">{errorMessages.movies.connect}</p>}
    {isEmpty && <p className="movies-card-list__message">{messages.movies.empty}</p>}
    {isLoading ? <Preloader />
    : <><ul className="movies-card-list">
        {currentMovies.map((movie) => {
          return(
            <MoviesCard
              isSaved={isSaved}
              savedMoviesStorage={savedMoviesStorage}
              movie={movie}
              name={movie.nameRU}
              duration={movie.duration}
              imageUrl={isSaved ? movie.image : movie.image.url}
              description={movie.description}
              link={isSaved ? movie.trailer : movie.trailerLink}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          )
        })}
      </ul>
      {!isSaved && maximumMovies > searchLimiter && <button className="movies-card-list__button" type="button" onClick={increaseSearchLimiter}>Ещё</button>}
      </>
    }</>
  );
}

export default MoviesCardList;
