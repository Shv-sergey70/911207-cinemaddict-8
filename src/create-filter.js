export default (filterName, filmsCount, checked = false) => {
  return `<a href="#${filterName.toLowerCase()}" class="main-navigation__item ${checked ? ` main-navigation__item--active` : ``}">${filterName} ${filterName === `All movies ` ? `` : `<span class="main-navigation__item-count">${filmsCount}</span>`}</a>`;
};
