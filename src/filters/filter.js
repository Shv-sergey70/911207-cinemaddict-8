import Component from "../component";

export default class Filter extends Component {
  constructor({name, isActive = false}) {
    super();

    this._name = name;
    this._link = `#${this._name.replace(` `, ``).toLowerCase()}`;
    this._isActive = isActive;
    this._onFilterClickBinded = this._onFilterClick.bind(this);
  }

  set filmsCount(value) {
    this._filmsCount = value;
  }

  isActive() {
    return this._isActive === true;
  }

  get name() {
    return this._name;
  }

  get _template() {
    return `<a href="${this._link}" class="main-navigation__item ${this._isActive ? `main-navigation__item--active` : ``}">${this._name} ${this._filmsCount !== undefined ? `<span class="main-navigation__item-count">${this._filmsCount}</span>` : ``}</a>`.trim();
  }

  set onFilter(func) {
    this._onFilter = func;
  }

  _onFilterClick(evt) {
    evt.preventDefault();

    return typeof this._onFilter === `function` && this._onFilter();
  }

  decrementFilmsCount() {
    this._element.querySelector(`.main-navigation__item-count`).textContent--;
  }

  incrementFilmsCount() {
    this._element.querySelector(`.main-navigation__item-count`).textContent++;
  }

  setActive(state) {
    this._isActive = state;

    if (state) {
      this._element.classList.add(`main-navigation__item--active`);
    } else {
      this._element.classList.remove(`main-navigation__item--active`);
    }
  }

  _bindListeners() {
    this._element.addEventListener(`click`, this._onFilterClickBinded);
  }

  _unbindListeners() {
    this._element.removeEventListener(`click`, this._onFilterClickBinded);
  }
}
