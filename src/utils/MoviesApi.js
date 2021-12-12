function getMovies() {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', { method: 'GET' })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
  
export default getMovies;
