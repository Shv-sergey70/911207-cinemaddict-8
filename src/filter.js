import Component from "./component";

export default class Filter extends Component {
  constructor({name, id, isChecked, isAdditional}, filmsCount) {
    super();

    this._name = name;
    this._id = id;
    this._isChecked = isChecked;
    this._isAdditional = isAdditional;
    this._filmsCount = filmsCount;
    this._onFilterClickBinded = this._onFilterClick.bind(this);
  }

  get _template() {
    return `<a href="#${this._id}" class="main-navigation__item ${this._isChecked ? `main-navigation__item--active` : ``}" ${this._isAdditional ? `main-navigation__item--additional` : ``}>${this._name} <span class="main-navigation__item-count">${this._filmsCount}</span></a>`.trim();
  }

  set onFilter(func) {
    this._onFilter = func;
  }

  _onFilterClick() {
    return typeof this._onFilter === `function` && this._onFilter();
  }

  _bindListeners() {
    this._element.addEventListener(`click`, this._onFilterClickBinded);
  }

  _unbindListeners() {
    this._element.removeEventListener(`click`, this._onFilterClickBinded);
  }
}
