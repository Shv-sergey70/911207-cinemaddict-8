import Component from "./component";
import {isFunction} from "./utility";

export default class Search extends Component {
  constructor() {
    super();

    this._onSearchKeydownBinded = this._onSearchKeydown.bind(this);
  }

  searchMoviesByTitle(movies, title) {
    return movies.filter((movie) => movie.title.toLowerCase().match(title.toLowerCase()));
  }

  _onSearchKeydown(evt) {
    return isFunction(this._onSearchKeydownFunc) && this._onSearchKeydownFunc(evt);
  }

  _onSearchFormSubmit(evt) {
    evt.preventDefault();
  }

  set onSearchKeydownFunc(func) {
    this._onSearchKeydownFunc = func;
  }

  get _template() {
    return `<form class="header__search search">
    <input type="text" name="search" class="search__field" placeholder="Search">
    <button type="submit" class="visually-hidden">Search</button>
  </form>`;
  }

  _bindListeners() {
    this._element.querySelector(`.search__field`).addEventListener(`keydown`, this._onSearchKeydownBinded);
    this._element.addEventListener(`submit`, this._onSearchFormSubmit);
  }

  _unbindListeners() {
    this._element.querySelector(`.search__field`).removeEventListener(`keydown`, this._onSearchKeydownBinded);
    this._element.removeEventListener(`submit`, this._onSearchFormSubmit);
  }
}
