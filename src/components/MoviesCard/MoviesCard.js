import { useState, useEffect } from 'react';

function MoviesCard ({ isSaved, name, duration, imageUrl, description, link, saveMovie, movieId, movies, savedMovies, deleteMovie, unmarkMovie }) {

  const [isMarked, mark] = useState(false);

  useEffect(() => {
    if (!isSaved && JSON.parse(localStorage.getItem('savedMovies')) && JSON.parse(localStorage.getItem('savedMovies')).some((savedMovie) => {
      return savedMovie.movieId === movieId;
    })) {
      toggleMark();
    }
  }, []);

  function getDuration(number) {
    return number/60 < 1 ? `${number%60}м` : `${Math.floor(number/60)}ч ${number%60 === 0 ? '' : `${number%60}м`}`;
  }

  function saveMovieHandler () {
    const foundMovies = JSON.parse(localStorage.getItem('allMovies'));
    saveMovie(foundMovies
      .find((movie) => {
        return movie.id === movieId;
      }), toggleMark
    );
  }

  function toggleMark() {
    isMarked ? mark(false) : mark(true);
  }

  function deleteMovieHandler () {
    if (isSaved) {
      deleteMovie(movieId);
    } else {
      unmarkMovie(JSON.parse(localStorage.getItem('savedMovies'))
        .find((savedMovie) => {
          return savedMovie.movieId === movieId;
        })
      );
      toggleMark();
    }
  }

  const briefDuration = getDuration(duration);

  return(
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__name">{name}</h2>
          <p className="movies-card__duration">{briefDuration}</p>
        </div>
        <button className={`movies-card__button ${isSaved ? "movies-card__button_saved" : `${isMarked ? "movies-card__button_marked" : "movies-card__button_unsaved"}`} `} type="button" aria-label={`${isSaved || isMarked ? "Удалить из списка сохранённых фильмов" : "Добавить в список сохранённых фильмов"}`} onClick={isSaved || isMarked ? deleteMovieHandler : saveMovieHandler}></button>
      </div>
      <a className="movies-card__link" href={link} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={isSaved ? imageUrl : `https://api.nomoreparties.co${imageUrl}`} alt={description} />
      </a>
    </li>
  );
}

export default MoviesCard;
