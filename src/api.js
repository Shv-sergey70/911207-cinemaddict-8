import FilmModel from "./film-model";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}:${response.statusText}`);
};

const toJSON = (response) => response.json();

export default class API {
  constructor() {
    this._endPoint = `https://es8-demo-srv.appspot.com/moowle`;
    this._authorization = `Basic eo0w590ik29883a`;
  }

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
      .then(toJSON);
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
