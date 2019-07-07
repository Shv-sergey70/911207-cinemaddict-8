import createFilter from './create-filter.js';
import FilmCard from './film-card.js';
import getFilmCardData from './film-card-data.js';
import FilmCardPopup from './film-card-popup.js';

const getRandomIntegerInRange = (min, max) => {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
};

const filtersFilmsCount = {
  MIN: 1,
  MAX: 100
};
const filters = [
  {
    name: `All movies `,
    checked: true
  },
  {
    name: `Watchlist `,
    checked: false
  },
  {
    name: `History `,
    checked: false
  },
  {
    name: `Favorites `,
    checked: false
  }
];
const filmsCardsCount = {
  USUAL: 7,
  EXTRA: 2
};

const mainNavigationBlock = document.querySelector(`.main-navigation`);
const statNavigation = mainNavigationBlock.querySelector(`.main-navigation__item--additional`);
const filmsListContainerBlock = document.querySelector(`.films-list__container`);
const filmsListsExtraBlocks = document.querySelectorAll(`.films-list--extra`);
const clearHtmlBlock = (domElement) => {
  domElement.innerText = ``;
};
const renderMainFilmCards = (cardsForRenderCount) => {
  clearHtmlBlock(filmsListContainerBlock);
  for (let i = 0; i < cardsForRenderCount; i++) {
    const cardData = getFilmCardData();
    const Card = new FilmCard(cardData, true);
    const Popup = new FilmCardPopup(cardData);
    Popup.setOnCloseButtonClickFunc = () => {
      Popup.remove();
      document.querySelector(`.film-details`).remove();
    };
    Card.commentsButtonClickFunc = () => {
      const body = document.querySelector(`body`);

      body.appendChild(Popup.render());
    };
    filmsListContainerBlock.appendChild(Card.render());
  }
};
const onFilterClick = () => {
  renderMainFilmCards(getRandomIntegerInRange(1, 7));
};


clearHtmlBlock(mainNavigationBlock);
filters.forEach((filter) => {
  const randomFilmNumber = getRandomIntegerInRange(filtersFilmsCount.MIN, filtersFilmsCount.MAX);
  mainNavigationBlock.insertAdjacentHTML(`beforeend`, createFilter(filter.name, randomFilmNumber, filter.checked));
});

const filtersElements = mainNavigationBlock.querySelectorAll(`.main-navigation__item`);
filtersElements.forEach((filter) => {
  filter.addEventListener(`click`, onFilterClick);
});
mainNavigationBlock.appendChild(statNavigation);

renderMainFilmCards(filmsCardsCount.USUAL);

filmsListsExtraBlocks.forEach((filmListExtraBlock) => {
  const filmListContainer = filmListExtraBlock.querySelector(`.films-list__container`);
  clearHtmlBlock(filmListContainer);

  for (let i = 0; i < filmsCardsCount.EXTRA; i++) {
    const cardData = getFilmCardData();
    const Card = new FilmCard(cardData);
    const Popup = new FilmCardPopup(cardData);
    Popup.setOnCloseButtonClickFunc = () => {
      Popup.remove();
      document.querySelector(`.film-details`).remove();
    };
    Card.commentsButtonClickFunc = () => {
      const body = document.querySelector(`body`);

      body.appendChild(Popup.render());
    };
    filmListContainer.appendChild(Card.render());
  }
});
