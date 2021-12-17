class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
      })
      .then(this._handleResponse);
  }
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "email": email,
        "password": password
      })
      })
      .then(this._handleResponse);
  }
  
  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      })
      .then(this._handleResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/identify`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      })
      .then(this._handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: this._headers
    })
    .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      })
      .then(this._handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
      })
      .then(this._handleResponse);
  }

  addMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "country" : data.country,
        "director" : data.director,
        "duration" : data.duration,
        "year" : data.year,
        "description" : data.description,
        "image" : `https://api.nomoreparties.co${data.image.url}`,
        "trailer" : data.trailerLink,
        "nameRU" : data.nameRU,
        "nameEN" : data.nameEN,
        "thumbnail" : `https://api.nomoreparties.co${data.image.url}`,
        "movieId" : data.id,
      })
      })
      .then(this._handleResponse);
  }

  removeMovie(movieID) {
    return fetch(`${this._baseUrl}/movies/${movieID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
      })
      .then(this._handleResponse);
  }

  _handleResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  }
}
  
const mainApi = new MainApi ({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;
