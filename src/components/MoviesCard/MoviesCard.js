import { useState, useEffect } from 'react';

function MoviesCard ({ 
  isSaved, 
  savedMoviesStorage,
  movie, 
  imageUrl, 
  link, 
  saveMovie, 
  deleteMovie
 }) {

  const [isMarked, mark] = useState(false);

  useEffect(() => {
    if (!isSaved && savedMoviesStorage.some((savedMovie) => {
      return savedMovie.movieId === movie.id;
    })) {
      mark(true);
    }
  }, [savedMoviesStorage]);

  function getDuration(number) {
    return number/60 < 1 ? `${number%60}м` : `${Math.floor(number/60)}ч ${number%60 === 0 ? '' : `${number%60}м`}`;
  }

  function saveMovieHandler () {
    saveMovie(movie);
  }

  function deleteMovieHandler () {
    if (isSaved) {
      deleteMovie(movie);
    } else {
      deleteMovie(savedMoviesStorage
        .find((savedMovie) => {
          return savedMovie.movieId === movie.id;
        })
      );
      mark(false);
    }
  }

  const briefDuration = getDuration(movie.duration);

  return(
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__name">{movie.nameRU}</h2>
          <p className="movies-card__duration">{briefDuration}</p>
        </div>
        <button className={`movies-card__button ${isSaved ? "movies-card__button_saved" : `${isMarked ? "movies-card__button_marked" : "movies-card__button_unsaved"}`} `} type="button" aria-label={`${isSaved || isMarked ? "Удалить из списка сохранённых фильмов" : "Добавить в список сохранённых фильмов"}`} onClick={isSaved || isMarked ? deleteMovieHandler : saveMovieHandler}></button>
      </div>
      <a className="movies-card__link" href={link} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={isSaved ? imageUrl : `https://api.nomoreparties.co${imageUrl}`} alt={movie.description} />
      </a>
    </li>
  );
}

export default MoviesCard;
