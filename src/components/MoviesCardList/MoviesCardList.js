import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList ({ isLoading, isSaved, movies, saveMovie, deleteMovie, savedMovies, unmarkMovie, searchLimiter, increaseSearchLimiter }) {

  const allMovies = JSON.parse(localStorage.getItem('shortMovies')) ? JSON.parse(localStorage.getItem('shortMovies')) : JSON.parse(localStorage.getItem('allMovies'));

  return(
    <>{isLoading ? <Preloader />
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
