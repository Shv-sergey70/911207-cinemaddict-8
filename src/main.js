import {filtersData} from './data';
import FilmCardPopup from './film-card-popup';
import {clearHtmlBlock} from "./utility";
import FilmCardExtra from "./film-card-extra";
import FilmCardMain from "./film-card-main";
import Filter from "./filter";
import Statistic from "./statistic";
import API from './backend/api';
import FilmModel from "./film-model";
const ApiClass = new API();

const renderMainFilmCard = (defaultCardData) => {
  const CardMain = new FilmCardMain(defaultCardData);
  const Popup = new FilmCardPopup(defaultCardData);

  Popup.setOnCloseButtonClickFunc = () => {
    Popup.remove();
  };
  Popup.setOnCommentSubmitCallbackFunc = () => {
    ApiClass.updateMovie({id: defaultCardData.id, data: FilmModel.toRaw(Popup)})
      .then((updatedCardData) => {
        defaultCardData = updatedCardData;
        Popup.disableCommentsBlock(false);
        Popup.resetCommentsBlock();
        CardMain.updateCommentsCount(Popup._comments.length);
        Popup._rerender();
      })
      .catch((error) => {
        console.error(`Can't update movie: ${error}`);
        Popup.setErrorCommentLabel(true);
        Popup.shake();
        Popup.disableCommentsBlock(false);
        Popup.updateData(defaultCardData);
      });
  };
  Popup.setOnRatingSubmitCallbackFunc = () => {
    ApiClass.updateMovie({id: defaultCardData.id, data: FilmModel.toRaw(Popup)})
      .then((updatedCardData) => {
        defaultCardData = updatedCardData;
        Popup.disableRatingBlock(false);
        Popup._rerender();
      })
      .catch((error) => {
        console.error(`Can't update movie: ${error}`);
        Popup.disableRatingBlock(false);
        Popup.setErrorRatingLabel(true);
        Popup.shake();
        Popup.updateData(defaultCardData);
      });
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
const titleElement = document.querySelector(`.films-list__title`);
clearHtmlBlock(mainNavigationBlock);
clearHtmlBlock(filmsListContainerBlock);
clearHtmlBlock(filmsListsExtraBlocks[0]);
clearHtmlBlock(filmsListsExtraBlocks[1]);

const renderPageWithData = (filmsData) => {
  const StatisticClass = new Statistic(filmsData);
  renderMainFilmCards(filmsData, StatisticClass);
  createFilters(filmsData, StatisticClass);
};

titleElement.classList.remove(`visually-hidden`);
ApiClass.getMovies()
  .then((filmsData) => {
    titleElement.classList.add(`visually-hidden`);
    renderPageWithData(filmsData);
  })
  .catch((error) => {
    console.error(`Loading data error: ${error}. Using mock data...`);
    titleElement.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
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
