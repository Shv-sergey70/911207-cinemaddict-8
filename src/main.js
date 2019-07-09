import {getFilmCardData, filtersData} from './data';
import FilmCardPopup from './film-card-popup';
import {clearHtmlBlock, getRandomIntegerInRange} from "./utility";
import FilmCardExtra from "./film-card-extra";
import FilmCardMain from "./film-card-main";
import Filter from "./filter";
import Statistic from "./statistic";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const filmsCardsCount = {
  USUAL: 7,
  EXTRA: 2
};

const mainNavigationBlock = document.querySelector(`.main-navigation`);
const statNavigation = mainNavigationBlock.querySelector(`.main-navigation__item--additional`);
const filmsListContainerBlock = document.querySelector(`.films-list__container`);
const filmsListsExtraBlocks = document.querySelectorAll(`.films-list--extra`);
const StatisticClass = new Statistic();
const getFilmsCardsData = (cardsForRenderCount) => {
  const cardsData = [];

  for (let i = 0; i < cardsForRenderCount; i++) {
    cardsData.push(getFilmCardData());
  }

  return cardsData;
};

const mainFilmsCardsData = getFilmsCardsData(filmsCardsCount.USUAL);
const renderMainFilmCards = (cardsData) => {
  clearHtmlBlock(filmsListContainerBlock);
  cardsData.forEach((cardData) => {
    const CardMain = new FilmCardMain(cardData);
    const Popup = new FilmCardPopup(cardData);

    Popup.setOnCloseButtonClickFunc = () => {
      Popup.remove();
    };
    Popup.setOnSubmitCallbackFunc = () => {
      CardMain.updateCommentsCount(Popup._comments.length);
    };
    CardMain.commentsButtonClickFunc = () => {
      const body = document.querySelector(`body`);

      body.appendChild(Popup.render());
    };
    CardMain.onMarkAsWatched = () => {
      CardMain.setState(`isWatched`, !CardMain.states.isWatched);
      Popup.setState(`isWatched`, CardMain.states.isWatched);
    };
    CardMain.onAddToWatchList = () => {
      CardMain.setState(`isInWatchList`, !CardMain.states.isInWatchList);
      Popup.setState(`isInWatchList`, CardMain.states.isInWatchList);
    };
    Popup.onMarkAsWatched = () => {
      Popup.setState(`isWatched`, !Popup.states.isWatched);
      CardMain.setState(`isWatched`, Popup.states.isWatched);
    };
    Popup.onAddToWatchList = () => {
      Popup.setState(`isInWatchList`, !Popup.states.isInWatchList);
      CardMain.setState(`isInWatchList`, Popup.states.isInWatchList);
    };
    filmsListContainerBlock.appendChild(CardMain.render());
  });
};

clearHtmlBlock(mainNavigationBlock);

renderMainFilmCards(mainFilmsCardsData);
const createFilters = () => {
  filtersData.forEach((filterData) => {
    const FilterClass = new Filter(filterData);

    switch (filterData.id) {
      case `watchlist`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(mainFilmsCardsData.filter((cardData) => cardData.states.isInWatchList));
        };

        break;
      }
      case `history`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(mainFilmsCardsData.filter((cardData) => cardData.states.isWatched));
        };

        break;
      }
      case `favorites`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(mainFilmsCardsData.filter((cardData) => cardData.states.isFavorite));
        };

        break;
      }
      case `all`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(mainFilmsCardsData);
        };

        break;
      }
      case `stats`: {
        FilterClass.onFilter = () => {
          document.querySelector(`.films`).classList.add(`visually-hidden`);
          document.querySelector(`main`).appendChild(StatisticClass.render());
        };

        break;
      }
      default: {
        throw new Error(`Unhandled case`);
      }
    }
    mainNavigationBlock.appendChild(FilterClass.render());
  });
  // mainNavigationBlock.appendChild(statNavigation);
};
createFilters();

filmsListsExtraBlocks.forEach((filmListExtraBlock) => {
  const filmListContainer = filmListExtraBlock.querySelector(`.films-list__container`);
  clearHtmlBlock(filmListContainer);

  for (let i = 0; i < filmsCardsCount.EXTRA; i++) {
    const cardData = getFilmCardData();
    const CardExtra = new FilmCardExtra(cardData);
    const Popup = new FilmCardPopup(cardData);
    Popup.setOnCloseButtonClickFunc = () => {
      Popup.remove();
    };
    Popup.setOnSubmitCallbackFunc = () => {
      CardExtra.updateCommentsCount(Popup._comments.length);
    };
    CardExtra.commentsButtonClickFunc = () => {
      const body = document.querySelector(`body`);

      body.appendChild(Popup.render());
    };
    CardExtra.onMarkAsWatched = () => {
      CardExtra.setState(`isWatched`, !CardExtra.states.isWatched);
      Popup.setState(`isWatched`, CardExtra.states.isWatched);
    };
    CardExtra.onAddToWatchList = () => {
      CardExtra.setState(`isInWatchList`, !CardExtra.states.isInWatchList);
      Popup.setState(`isInWatchList`, CardExtra.states.isInWatchList);
    };
    filmListContainer.appendChild(CardExtra.render());
  }
});
