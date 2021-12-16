function MoviesCard ({ isSaved, isMarked, name, duration, imageUrl, description }) {

  function getDuration(number) {
    return number/60 < 1 ? `${number%60}м` : `${Math.floor(number/60)}ч ${number%60 === 0 ? '' : `${number%60}м`}`;
  }

  const briefDuration = getDuration(duration);

  return(
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__info">
          <h2 className="movies-card__name">{name}</h2>
          <p className="movies-card__duration">{briefDuration}</p>
        </div>
        <button className={`movies-card__button ${isSaved ? "movies-card__button_saved" : `${isMarked ? "movies-card__button_marked" : "movies-card__button_unsaved"}`} `} type="button" aria-label={`${isSaved || isMarked ? "Удалить из списка сохранённых фильмов" : "Добавить в список сохранённых фильмов"}`}></button>
      </div>
      <img className="movies-card__image" src={`https://api.nomoreparties.co${imageUrl}`} alt={description}/>
    </li>
  );
}

export default MoviesCard;
