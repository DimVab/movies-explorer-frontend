import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList ({ isLoading, isSaved, movies, saveMovie, deleteMovie, savedMovies, unmarkMovie, searchLimiter, increaseSearchLimiter, isError, isEmpty }) {

  const allMovies = JSON.parse(localStorage.getItem('shortMovies')) ? JSON.parse(localStorage.getItem('shortMovies')) : JSON.parse(localStorage.getItem('allMovies'));

  return(
    <>
    {isError && <p className="movies-card-list__message movies-card-list__message_type_error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раза</p>}
    {isEmpty && <p className="movies-card-list__message">Ничего не найдено</p>}
    {isLoading ? <Preloader />
    : <><ul className="movies-card-list">
        {movies.map((movie) => {
          return(
            <MoviesCard
              isSaved={isSaved}
              name={movie.nameRU}
              duration={movie.duration}
              imageUrl={isSaved ? movie.image : movie.image.url}
              description={movie.description}
              link={isSaved ? movie.trailer : movie.trailerLink}
              key={isSaved ? movie._id : movie.id}
              movieId={isSaved ? movie._id : movie.id}
              saveMovie={saveMovie}
              movies={movies}
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
              unmarkMovie={unmarkMovie}
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
