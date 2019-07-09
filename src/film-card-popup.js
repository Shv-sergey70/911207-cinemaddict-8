/**
 * @property {Array} _comments
 * @property {Object} _rates
 * @property {Object} _emoji
 * @property {String} _director
 * @property {String} _writers
 * @property {Array} _actors
 * @property {String} _country
 * @property {String} _ageRate
 */
import Component from "./component";
import {keyCodes} from "./utility";
import moment from "moment";

export default class FilmCardPopup extends Component {
  constructor(data) {
    super(data);

    ({
      comments: this._comments,
      rates: this._rates,
      emoji: this._emoji,
      director: this._director,
      writers: this._writers,
      actors: this._actors,
      country: this._country,
      ageRate: this._ageRate} = data);

    this._ownRating = null;
    this._onCloseButtonClickBinded = this._onCloseButtonClick.bind(this);
    this._onSubmitFormBinded = this._onSubmitForm.bind(this);
    this._onCommentKeydownBinded = this._onCommentKeydown.bind(this);
    this._onRatingInputClickBinded = this._onRatingInputClick.bind(this);
  }

  set setOnCloseButtonClickFunc(func) {
    this._onCloseButtonClickFunc = func;
  }

  set setOnSubmitCallbackFunc(func) {
    this._onSubmitCallbackFunc = func;
  }

  get _template() {
    return `
<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${this._poster}" alt="${this._title}">

        <p class="film-details__age">${this._ageRate}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${this._title}</h3>
            <p class="film-details__title-original">Original: Невероятная семейка</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${this._rating}</p>
            <p class="film-details__user-rating">${this._ownRating === null ? `` : `Your rate ${this._ownRating}`}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${this._director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${this._writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${this._actors.join(`, `)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${moment(this._releaseDate).format(`D MMMM YYYY`)} (${this._country})</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${this._duration} min</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${this._country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${this._genres.map((genre) => `
              <span class="film-details__genre">${genre}</span>`.trim()).join(``)}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${this._description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._states.isInWatchList ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._states.isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._states.isFavorite? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
  
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${this._comments.map((comment) => `
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">${comment.emoji}</span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${moment(comment.dateAdded).fromNow()}</span>
            </p>
          </div>
        </li>`.trim()).join(``)}
      </ul>

      <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
          <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

          <div class="film-details__emoji-list">
          ${Object.keys(this._emoji).map((emojiClass) => `
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiClass}" value="${emojiClass}">
            <label class="film-details__emoji-label" for="emoji-${emojiClass}">${this._emoji[emojiClass]}</label>`).join(``)}          
          </div>
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
        </label>
      </div>
    </section>

    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
        <button class="film-details__watched-reset" type="button">undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
          ${this._rates.map((rate) => `
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${rate}" id="rating-${rate}" ${rate === this._ownRating ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-${rate}">${rate}</label>`.trim()).join(``)}
          </div>
        </section>
      </div>
    </section>
  </form>
</section>`.trim();
  }

  _onCloseButtonClick() {
    return typeof this._onCloseButtonClickFunc === `function` && this._onCloseButtonClickFunc();
  }

  _onSubmitForm() {
    return typeof this._onSubmitCallbackFunc === `function` && this._onSubmitCallbackFunc();
  }

  _onRatingInputClick(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      this._ownRating = Number(evt.target.value);
      this._rerender();
    }
  }

  _createMapper(entry) {
    return {
      score: (value) => {
        entry.ownRating = Number(value);
      },
      comment: (value) => {
        entry.comments.text = value;
      },
      [`comment-emoji`]: (value) => {
        entry.comments.emoji = this._emoji[value];
      }
    };
  }

  _processForm(formData) {
    const entry = {
      ownRating: null,
      comments: {
        emoji: null,
        text: null,
        author: `Me`,
        dateAdded: `3 days ago`
      }
    };

    const entryMapper = this._createMapper(entry);

    for (let pair of formData.entries()) {
      let [property, value] = pair;
      if (entryMapper[property]) {
        entryMapper[property](value);
      }
    }

    return entry;
  }

  _onCommentKeydown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.code === keyCodes.ENTER) {
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const entry = this._processForm(formData);

      entry.comments.emoji = entry.comments.emoji ? entry.comments.emoji : this._emoji[`neutral-face`];

      this._comments.push(entry.comments);
      this._ownRating = entry.ownRating;

      this._rerender();
      this._onSubmitFormBinded();
    }
  }

  _bindListeners() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClickBinded);
    this._element.querySelector(`textarea[name="comment"]`).addEventListener(`keydown`, this._onCommentKeydownBinded);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onRatingInputClickBinded);
  }

  _unbindListeners() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClickBinded);
    this._element.querySelector(`textarea[name="comment"]`).removeEventListener(`keydown`, this._onCommentKeydownBinded);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onRatingInputClickBinded);
  }
}
