import Component from "./component";

export default class Filter extends Component {
  constructor({name, id, isChecked, isAdditional}) {
    super();

    this._name = name;
    this._id = id;
    this._isChecked = isChecked;
    this._isAdditional = isAdditional;
    this._onFilterClickBinded = this._onFilterClick.bind(this);
  }

  set filmsCount(value) {
    this._filmsCount = value;
  }

  get _template() {
    return `<a href="#${this._id}" class="main-navigation__item ${this._isChecked ? `main-navigation__item--active` : ``} ${this._isAdditional ? `main-navigation__item--additional` : ``}">${this._name} ${this._filmsCount !== undefined ? `<span class="main-navigation__item-count">${this._filmsCount}</span>` : ``}</a>`.trim();
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
