import FilmCard from "./film-card-main";
import FilmCardPopup from "./film-card-popup";
import FilmModel from "./film-model";
import {ApiClass} from "./main";
import FilmCardExtra from "./film-card-extra";
import {clearHtmlBlock} from "./utility";
import {getActiveFilterName, getFilterByName} from "./filters/render-filters";

const FilmContainerBlock = {
  MAIN: document.querySelector(`.films-list .films-list__container`),
  TOP_RATED: document.querySelectorAll(`.films-list--extra .films-list__container`)[0],
  MOST_COMMENTED: document.querySelectorAll(`.films-list--extra .films-list__container`)[1],
};

const filmsStatesToFilterMapper = {
  'isWatched': `History`,
  'isInWatchList': `Watchlist`
};

const getFilmCardDomElements = (defaultCardData, FilmClass) => {
  const Card = new FilmClass(defaultCardData);
  const Popup = new FilmCardPopup(defaultCardData);

  Popup.setOnCloseButtonClickFunc = () => {
    Popup.remove();
  };
  Popup.setOnCommentSubmitCallbackFunc = () => {
    ApiClass.updateMovie({id: Popup.id, data: FilmModel.toRaw(Popup)})
      .then((updatedCardData) => {
        defaultCardData = updatedCardData;
        Popup.disableCommentsBlock(false);
        Popup.resetCommentsBlock();
        Card.updateCommentsCount(Popup._comments.length);
        Popup._rerender(); // TODO поправь приватность
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
    ApiClass.updateMovie({id: Popup.id, data: FilmModel.toRaw(Popup)})
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
  Card.commentsButtonClickFunc = () => {
    const body = document.querySelector(`body`);

    body.appendChild(Popup.render());
  };

  if (Card instanceof FilmCard) {
    Card.onMarkAsWatched = () => { // TODO вынести общую логику нажатия на кнопку в функцию
      Card.setState(`isWatched`, !Card.states.isWatched);
      ApiClass.updateMovie({id: Card.id, data: FilmModel.toRaw(Card)})
        .then((updatedCardData) => {
          defaultCardData = updatedCardData;
          Popup.setState(`isWatched`, Card.states.isWatched);
          Card.addActiveClassForMarkAsWatched(Card.states.isWatched);

          if (!Card.states.isWatched) {
            getFilterByName(filmsStatesToFilterMapper[`isWatched`]).decrementFilmsCount();
            if (getActiveFilterName() === `History`) {
              Card.remove();
            }
          } else {
            getFilterByName(filmsStatesToFilterMapper[`isWatched`]).incrementFilmsCount();
          }
        })
      .catch((error) => {
        console.error(`Can't update movie: ${error}`);
        Card.setState(`isWatched`, !Card.states.isWatched);
      });
    };
    Card.onAddToWatchList = () => {
      Card.setState(`isInWatchList`, !Card.states.isInWatchList);
      ApiClass.updateMovie({id: Card.id, data: FilmModel.toRaw(Card)})
        .then((updatedCardData) => {
          defaultCardData = updatedCardData;
          Popup.setState(`isInWatchList`, Card.states.isInWatchList);
          Card.addActiveClassForAddToWatchlist(Card.states.isInWatchList);

          if (!Card.states.isInWatchList) {
            getFilterByName(filmsStatesToFilterMapper[`isInWatchList`]).decrementFilmsCount();
            if (getActiveFilterName() === `Watchlist`) {
              Card.remove();
            }
          } else {
            getFilterByName(filmsStatesToFilterMapper[`isInWatchList`]).incrementFilmsCount();
          }
        })
        .catch((error) => {
          console.error(`Can't update movie: ${error}`);
          Card.setState(`isInWatchList`, !Card.states.isInWatchList);
        });
    };
  }

  Popup.onMarkAsWatched = () => {
    Popup.setState(`isWatched`, !Popup.states.isWatched);
    Card.setState(`isWatched`, Popup.states.isWatched);
    Card.addActiveClassForMarkAsWatched(Popup.states.isWatched); // Не должно быть актуально для экстра-карточек!
  };
  Popup.onAddToWatchList = () => {
    Popup.setState(`isInWatchList`, !Popup.states.isInWatchList);
    Card.setState(`isInWatchList`, Popup.states.isInWatchList);
    Card.addActiveClassForAddToWatchlist(Popup.states.isInWatchList); // Не должно быть актуально для экстра-карточек!
  };

  return Card.render();
};

const getFilmsCardsDomElements = (cardsData, FilmClass) => {
  const fragment = document.createDocumentFragment();

  cardsData.forEach((cardData) => {
    fragment.appendChild(getFilmCardDomElements(cardData, FilmClass));
  });

  return fragment;
};

export const renderMainFilms = (cardsData) => {
  clearHtmlBlock(FilmContainerBlock.MAIN);
  FilmContainerBlock.MAIN.appendChild(getFilmsCardsDomElements(cardsData, FilmCard));
};

export const renderTopRatedFilms = (cardsData) => {
  clearHtmlBlock(FilmContainerBlock.TOP_RATED);
  const copyCardsData = [...cardsData];
  copyCardsData.sort((a, b) => b.rating - a.rating);

  FilmContainerBlock.TOP_RATED.appendChild(getFilmsCardsDomElements([copyCardsData[0], copyCardsData[1]], FilmCardExtra));
};

export const renderMostCommentedFilms = (cardsData) => {
  clearHtmlBlock(FilmContainerBlock.MOST_COMMENTED);
  const copyCardsData = [...cardsData];
  copyCardsData.sort((a, b) => b.comments.length - a.comments.length);

  FilmContainerBlock.MOST_COMMENTED.appendChild(getFilmsCardsDomElements([copyCardsData[0], copyCardsData[1]], FilmCardExtra));
};
