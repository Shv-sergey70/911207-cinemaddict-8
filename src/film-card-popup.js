/**
 * @property {Array} _comments
 * @property {Object} _rates
 * @property {Object} _emojiDict
 * @property {String} _director
 * @property {String} _writers
 * @property {Array} _actors
 * @property {String} _releaseCountry
 * @property {String} _ageRate
 * @property {String} _alternativeTitle
 */
import FilmAbstract from "./film-abstract";
import {isFunction, Keys} from "./utility";
import moment from "moment";
import {EmojiDict, KeyCode} from "./constants";

const rates = {
  MIN: 1,
  MAX: 10
};

export default class FilmCardPopup extends FilmAbstract {
  constructor(data) {
    super(data);

    ({
      comments: [...this._comments],
      director: this._director,
      writers: this._writers,
      actors: this._actors,
      releaseCountry: this._releaseCountry,
      ageRate: this._ageRate,
      ownRating: this._ownRating,
      alternativeTitle: this._alternativeTitle} = data);

    this._emojiDict = EmojiDict;
    this._onCloseButtonClickBinded = this._onCloseButtonClick.bind(this);
    this._onEscKeydownBinded = this._onEscKeydown.bind(this);
    this._onSubmitCommentFormBinded = this._onSubmitCommentForm.bind(this);
    this._onCommentKeydownBinded = this._onCommentKeydown.bind(this);
    this._onRatingInputClickBinded = this._onRatingInputClick.bind(this);
    this._onSubmitRatingBinded = this._onSubmitRating.bind(this);
    this._onUndoButtonClickBinded = this._onUndoButtonClick.bind(this);
  }

  set setOnCloseButtonClickFunc(func) {
    this._onCloseButtonClickFunc = func;
  }

  set setOnCommentSubmitCallbackFunc(func) {
    this._onCommentSubmitCallbackFunc = func;
  }

  set setOnRatingSubmitCallbackFunc(func) {
    this._onRatingSubmitCallbackFunc = func;
  }

  set setOnUndoButtonClickFunc(func) {
    this._onUndoButtonClickFunc = func;
  }

  get _rates() {
    const ratesArr = [];
    for (let i = rates.MIN; i <= rates.MAX; i++) {
      ratesArr.push(i);
    }

    return ratesArr;
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

        <p class="film-details__age">${this._ageRate}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${this._title}</h3>
            <p class="film-details__title-original">${this._alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${this._rating}</p>
            <p class="film-details__user-rating">${this._ownRating === null ? `` : `Your rate <span>${this._ownRating}</span>`}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${this._director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${this._writers.join(`, `)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${this._actors.join(`, `)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${moment(this._releaseDate).format(`D MMMM YYYY`)} (${this._releaseCountry})</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${this._duration} min</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${this._releaseCountry}</td>
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

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._states.isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
  
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${this._renderComments(this._comments)}
      </ul>

      <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
          <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

          <div class="film-details__emoji-list">
          ${Object.keys(this._emojiDict).map((emojiName) => `
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
            <label class="film-details__emoji-label" for="emoji-${emojiName}">${this._emojiDict[emojiName]}</label>`).join(``)}          
          </div>
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
        </label>
      </div>
    </section>

    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <span class="film-details__watched-status film-details__watched-status--active"></span>
        <button class="film-details__watched-reset visually-hidden" type="button">undo</button>
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

  _commentTemplate(comment) {
    return `
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">${this._emojiDict[comment.emotion]}</span>
          <div>
            <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
            </p>
          </div>
      </li>`.trim();
  }

  updateFilmsControlButtons() {
    this._element.querySelector(`#watched`).checked = this.states.isWatched;
    this._element.querySelector(`#watchlist`).checked = this.states.isInWatchList;
  }

  _showUndoButton() {
    this._element.querySelector(`.film-details__watched-status`).textContent = `Comment added`;
    this._element.querySelector(`.film-details__watched-reset`).classList.remove(`visually-hidden`);
  }

  _hideUndoButton() {
    this._element.querySelector(`.film-details__watched-status`).textContent = `Comment deleted`;
    this._element.querySelector(`.film-details__watched-reset`).classList.add(`visually-hidden`);
  }

  _renderComments(commentsData) {
    return commentsData.map((comment) => this._commentTemplate(comment)).join(``);
  }

  _onCloseButtonClick() {
    return isFunction(this._onCloseButtonClickFunc) && this._onCloseButtonClickFunc();
  }

  _onUndoButtonClick() {
    this._element.querySelector(`.film-details__watched-reset`).removeEventListener(`click`, this._onUndoButtonClickBinded);
    this._hideUndoButton();

    return isFunction(this._onUndoButtonClickFunc) && this._onUndoButtonClickFunc(this._comments);
  }

  _onSubmitCommentForm() {
    return isFunction(this._onCommentSubmitCallbackFunc) && this._onCommentSubmitCallbackFunc(this._comments);
  }

  _onSubmitRating() {
    return isFunction(this._onRatingSubmitCallbackFunc) && this._onRatingSubmitCallbackFunc(this._ownRating);
  }

  _onEscKeydown(evtKeydown) {
    if (evtKeydown.key === Keys.ESC) {
      this._element.remove();
    }
  }

  _onRatingInputClick(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      this.setErrorRatingLabel(false);

      this._ownRating = Number(evt.target.value);
      this.disableRatingBlock(true);
      this._onSubmitRatingBinded();
    }
  }

  _createMapper(entry) {
    return {
      [`comment`]: (value) => {
        entry.comment = value;
      },
      [`comment-emoji`]: (value) => {
        entry.emotion = value;
      }
    };
  }

  disableCommentsBlock(state) {
    this._element.querySelector(`.film-details__add-emoji`).disabled = state;
    this._element.querySelector(`.film-details__comment-input`).disabled = state;
  }

  disableRatingBlock(state) {
    this._element.querySelectorAll(`.film-details__user-rating-input`).forEach((ratingInput) => {
      ratingInput.disabled = state;
    });
  }

  resetCommentsBlock() {
    const emojiInputs = this._element.querySelectorAll(`[name="comment-emoji"]`);

    emojiInputs.forEach((emojiInput) => {
      emojiInput.checked = false;
    });

    document.querySelector(`.film-details__comment-input`).value = ``;
  }

  setErrorCommentLabel(state) {
    this._element.querySelector(`.film-details__comment-input`).style.border = state ? `2px solid red` : ``;
  }

  setErrorRatingLabel(state) {
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((ratingLabel) => {
      ratingLabel.style.backgroundColor = ``;
    });
    this._element.querySelector(`.film-details__user-rating-input:checked + label`).style.backgroundColor = state ? `red` : ``;
  }

  shake() {
    const formElement = this._element.querySelector(`.film-details__inner`);
    formElement.classList.add(`shake`);

    setTimeout(() => {
      formElement.classList.remove(`shake`);
    }, 600);
  }

  _processForm(formData) {
    formData.delete(`score`);
    const entry = {
      author: `Me`,
      comment: null,
      date: Date.now(),
      emotion: null
    };

    const entryMapper = this._createMapper(entry);

    window.testVal = formData;

    for (let pair of formData.entries()) {
      let [property, value] = pair;
      if (entryMapper[property]) {
        entryMapper[property](value);
      }
    }

    return entry;
  }

  _onCommentKeydown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.code === KeyCode.ENTER) {
      this.setErrorCommentLabel(false);
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const entry = this._processForm(formData);

      entry.emotion = entry.emotion ? entry.emotion : `neutral-face`;

      this._comments.push(entry);

      this.disableCommentsBlock(true);
      this._element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._onUndoButtonClickBinded);
      this._showUndoButton();
      this._onSubmitCommentFormBinded();
    }
  }

  updateData(newData) {
    this._states = {
      isInWatchList: newData.states.isInWatchList,
      isWatched: newData.states.isWatched,
      isFavorite: newData.states.isFavorite
    };
    this._comments = [...newData.comments];
    this._ownRating = newData.ownRating;
  }

  updateRatingView() {
    this._element.querySelector(`.film-details__user-rating span`).textContent = this._ownRating;
  }

  updateCommentsView() {
    this._element.querySelector(`.film-details__comments-count`).textContent = this._comments.length;
    this._element.querySelector(`.film-details__comments-list`).innerHTML = this._renderComments(this._comments);
  }

  _bindListeners() {
    document.addEventListener(`keydown`, this._onEscKeydownBinded);
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClickBinded);
    this._element.querySelector(`textarea[name="comment"]`).addEventListener(`keydown`, this._onCommentKeydownBinded);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onRatingInputClickBinded);
    this._element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._onAddToWatchListButtonClickBinded);
    this._element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._onMarkAsWatchedButtonClickBinded);
  }

  _unbindListeners() {
    document.removeEventListener(`keydown`, this._onEscKeydownBinded);
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClickBinded);
    this._element.querySelector(`textarea[name="comment"]`).removeEventListener(`keydown`, this._onCommentKeydownBinded);
    this._element.querySelector(`.film-details__user-rating-score`).removeEventListener(`click`, this._onRatingInputClickBinded);
    this._element.querySelector(`.film-details__control-label--watchlist`).removeEventListener(`click`, this._onAddToWatchListButtonClickBinded);
    this._element.querySelector(`.film-details__control-label--watched`).removeEventListener(`click`, this._onMarkAsWatchedButtonClickBinded);
  }
}
