import FilmModel from "../film-model";
import {Method, StatusCode} from '../constants';

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECT) {
    return response;
  }

  throw new Error(`${response.status}:${response.statusText}`);
};

const toJSON = (response) => response.json();

export default class API {
  constructor() {
    this._endPoint = `https://es8-demo-srv.appspot.com/moowle`;
    this._authorization = `Basic eo0w590ik29816a`;
  }

  /**
   *
   * @return {Promise}
   */
  getMovies() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(FilmModel.parseFilms);
  }

  updateMovie({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-type': `application/json`})
    })
      .then(toJSON)
      .then(FilmModel.parseFilm);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        console.error(`Fetch error: ${error}`);
        throw error;
      });
  }
}
