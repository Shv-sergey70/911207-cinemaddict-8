import {getFilmCardData, filtersData} from './data';
import FilmCardPopup from './film-card-popup';
import {clearHtmlBlock} from "./utility";
import FilmCardExtra from "./film-card-extra";
import FilmCardMain from "./film-card-main";
import Filter from "./filter";
import Statistic from "./statistic";
import API from './api';

const filmsCardsCount = {
  USUAL: 7,
  EXTRA: 2
};

const getFilmsCardsData = (cardsForRenderCount) => {
  const cardsData = [];

  for (let i = 0; i < cardsForRenderCount; i++) {
    cardsData.push(getFilmCardData());
  }

  return cardsData;
};

const renderMainFilmCard = (cardData) => {
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
};
const renderMainFilmCards = (cardsData, statistic) => {
  document.querySelector(`.films`).classList.remove(`visually-hidden`);
  statistic.remove();
  clearHtmlBlock(filmsListContainerBlock);
  cardsData.forEach(renderMainFilmCard);
};
const createFilters = (filmsData, statistic) => {
  filtersData.forEach((filterData) => {
    const FilterClass = new Filter(filterData);

    switch (filterData.id) {
      case `watchlist`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(filmsData.filter((cardData) => cardData.states.isInWatchList));
        };

        FilterClass.filmsCount = filmsData.filter((cardData) => cardData.states.isInWatchList).length;

        break;
      }
      case `history`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(filmsData.filter((cardData) => cardData.states.isWatched));
        };

        FilterClass.filmsCount = filmsData.filter((cardData) => cardData.states.isWatched).length;

        break;
      }
      case `favorites`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(filmsData.filter((cardData) => cardData.states.isFavorite));
        };

        FilterClass.filmsCount = filmsData.filter((cardData) => cardData.states.isFavorite).length;

        break;
      }
      case `all`: {
        FilterClass.onFilter = () => {
          renderMainFilmCards(filmsData);
        };

        break;
      }
      case `stats`: {
        FilterClass.onFilter = () => {
          statistic.remove();
          document.querySelector(`.films`).classList.add(`visually-hidden`);
          document.querySelector(`main`).appendChild(statistic.render());
        };

        break;
      }
      default: {
        throw new Error(`Unhandled case`);
      }
    }
    mainNavigationBlock.appendChild(FilterClass.render());
  });
};


const mainNavigationBlock = document.querySelector(`.main-navigation`);
const filmsListContainerBlock = document.querySelector(`.films-list__container`);
const filmsListsExtraBlocks = document.querySelectorAll(`.films-list--extra`);
const mainFilmsCardsData = getFilmsCardsData(filmsCardsCount.USUAL);
clearHtmlBlock(mainNavigationBlock);

const renderPageWithData = (filmsData) => {
  const StatisticClass = new Statistic(filmsData);
  renderMainFilmCards(filmsData, StatisticClass);
  createFilters(filmsData, StatisticClass);
};

const ApiClass = new API();
ApiClass.getMovies()
  .then((filmsData) => {
    renderPageWithData(filmsData);
  })
  .catch((error) => {
    console.error(`Loading data error: ${error}. Using mock data...`);
    renderPageWithData(mainFilmsCardsData);
  });


// filmsListsExtraBlocks.forEach((filmListExtraBlock) => {
//   const filmListContainer = filmListExtraBlock.querySelector(`.films-list__container`);
//   clearHtmlBlock(filmListContainer);
//
//   for (let i = 0; i < filmsCardsCount.EXTRA; i++) {
//     const cardData = getFilmCardData();
//     const CardExtra = new FilmCardExtra(cardData);
//     const Popup = new FilmCardPopup(cardData);
//     Popup.setOnCloseButtonClickFunc = () => {
//       Popup.remove();
//     };
//     Popup.setOnSubmitCallbackFunc = () => {
//       CardExtra.updateCommentsCount(Popup._comments.length);
//     };
//     CardExtra.commentsButtonClickFunc = () => {
//       const body = document.querySelector(`body`);
//
//       body.appendChild(Popup.render());
//     };
//     CardExtra.onMarkAsWatched = () => {
//       CardExtra.setState(`isWatched`, !CardExtra.states.isWatched);
//       Popup.setState(`isWatched`, CardExtra.states.isWatched);
//     };
//     CardExtra.onAddToWatchList = () => {
//       CardExtra.setState(`isInWatchList`, !CardExtra.states.isInWatchList);
//       Popup.setState(`isInWatchList`, CardExtra.states.isInWatchList);
//     };
//     Popup.onMarkAsWatched = () => {
//       Popup.setState(`isWatched`, !Popup.states.isWatched);
//       CardExtra.setState(`isWatched`, Popup.states.isWatched);
//     };
//     Popup.onAddToWatchList = () => {
//       Popup.setState(`isInWatchList`, !Popup.states.isInWatchList);
//       CardExtra.setState(`isInWatchList`, Popup.states.isInWatchList);
//     };
//     filmListContainer.appendChild(CardExtra.render());
//   }
// });
