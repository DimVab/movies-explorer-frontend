import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList ({ isLoading, isSaved, movies, saveMovie, deleteMovie }) {

  return(
    <>{isLoading ? <Preloader />
    : <><ul className="movies-card-list">
        {movies.map((movie) => {
          return(
            <MoviesCard
              isSaved={isSaved}
              isMarked={false}
              name={movie.nameRU}
              duration={movie.duration}
              imageUrl={isSaved ? movie.image : movie.image.url}
              description={movie.description}
              link={movie.trailerLink}
              key={isSaved ? movie._id : movie.id}
              movieId={isSaved ? movie._id : movie.id}
              saveMovie={saveMovie}
              savedMovies={movies}
              deleteMovie={deleteMovie}
            />
          )
        })}
      </ul>
      {!isSaved && movies.length > 0 && <button className="movies-card-list__button" type="button">Ещё</button>}
      </>
    }</>
  );
}

export default MoviesCardList;
