import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import { errorMessages, messages } from '../../utils/messages';

function MoviesCardList ({
  isSaved,
  isError, 
  isEmpty,
  isLoading, 
  currentMovies,
  savedMoviesStorage,
  saveMovie, 
  deleteMovie, 
  searchLimiter, 
  increaseSearchLimiter,
  moviesStorage
 }) {

  const [maximumMovies, setMaximumMovies] = useState(0);

  // в отличии от одноимённой функции в app, не выводит ошибку, тк здесь это не нужно
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
        setMaximumMovies(moviesStorage.length);
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
              imageUrl={isSaved ? movie.image : movie.image.url}
              link={isSaved ? movie.trailer : movie.trailerLink}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              key={isSaved ? movie._id : movie.id}
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
