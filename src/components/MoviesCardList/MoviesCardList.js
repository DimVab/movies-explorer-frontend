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
  increaseSearchLimiter
 }) {

  const allMovies = JSON.parse(localStorage.getItem('shortMovies')) ? JSON.parse(localStorage.getItem('shortMovies')) : JSON.parse(localStorage.getItem('allMovies'));

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
      {!isSaved && (allMovies && allMovies.length > searchLimiter) && <button className="movies-card-list__button" type="button" onClick={increaseSearchLimiter}>Ещё</button>}
      </>
    }</>
  );
}

export default MoviesCardList;
