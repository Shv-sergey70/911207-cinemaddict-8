import FilmModel from "./film-model";

export default class Provider {
  /**
   *
   * @param {API} api
   * @param {Store} store
   */
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
        .then((response) => {
          response.map((filmData) => {
            this._store.setItem({key: filmData.id, value: filmData.toRaw()});
          });

          return response;
        });
    } else {
      const rawFilmsData = this._store.getAll();

      return Promise.resolve(FilmModel.parseFilms(Object.values(rawFilmsData)));
    }
  }

  updateMovie({id, data}) {
    if (this._isOnline()) {
      return this._api.updateMovie({id, data})
        .then((filmData) => {
          this._store.setItem({key: filmData.id, value: filmData.toRaw()});

          return filmData;
        });
    } else {
      // console.log(id);
      // console.log(data);
      this._store.setItem({key: id, value: data});

      return Promise.resolve(FilmModel.parseFilm(data));
    }
  }
}
