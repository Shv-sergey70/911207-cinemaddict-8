import FilmCardAbstract from "./film-card-abstract";

export default class FilmCardExtra extends FilmCardAbstract {
  constructor(data) {
    super(data);
  }

  get _template() {
    return `
        <article class="film-card film-card--no-controls">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._year}</span>
            <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
          <button class="film-card__comments">${this._commentsCount} comments</button>
        </article>`.trim();
  }
}
