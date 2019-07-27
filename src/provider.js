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
    this._needSync = false;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  isNeedSync() {
    return this._needSync;
  }

  syncMovies(rawMovies) {
    return this._api.syncMovies(Object.values(rawMovies));
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
      this._needSync = true;
      this._store.setItem({key: id, value: data});

      return Promise.resolve(FilmModel.parseFilm(data));
    }
  }
}
