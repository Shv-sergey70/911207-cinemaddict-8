import FilmCard from "./film-card-main";
import FilmCardPopup from "./film-card-popup";
import {ProviderComponent} from "./main";
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
  Popup.setOnUndoButtonClickFunc = (newComments) => {
    newComments.pop();
    const oldComments = defaultCardData.comments;
    defaultCardData.comments = newComments;
    ProviderComponent.updateMovie({id: Popup.id, data: defaultCardData.toRaw()})
      .then((updatedCardData) => {
        defaultCardData = updatedCardData;
        Popup.resetCommentsBlock();
        Card.updateCommentsCount(defaultCardData.comments.length);
        Popup.updateCommentsView();
      })
      .catch(() => {
        defaultCardData.comments = oldComments;
        Popup.shake();
        Popup.updateData(defaultCardData);
      });
  };
  Popup.setOnCommentSubmitCallbackFunc = (newComments) => {
    const oldComments = defaultCardData.comments;
    defaultCardData.comments = newComments;
    ProviderComponent.updateMovie({id: Popup.id, data: defaultCardData.toRaw()})
      .then((updatedCardData) => {
        defaultCardData = updatedCardData;
        Popup.disableCommentsBlock(false);
        Popup.resetCommentsBlock();
        Card.updateCommentsCount(defaultCardData.comments.length);
        Popup.updateCommentsView();
      })
      .catch((error) => {
        console.error(`Can't update movie: ${error}`);
        defaultCardData.comments = oldComments;
        Popup.setErrorCommentLabel(true);
        Popup.shake();
        Popup.disableCommentsBlock(false);
        Popup.updateData(defaultCardData);
      });
  };
  Popup.setOnRatingSubmitCallbackFunc = (newRating) => {
    const oldRating = defaultCardData.ownRating;
    defaultCardData.ownRating = newRating;
    ProviderComponent.updateMovie({id: Popup.id, data: defaultCardData.toRaw()})
      .then((updatedCardData) => {
        defaultCardData = updatedCardData;
        Popup.disableRatingBlock(false);
        Popup.updateRatingView();
      })
      .catch((error) => {
        console.error(`Can't update movie: ${error}`);
        defaultCardData.ownRating = oldRating;
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

  if (Card instanceof FilmCard) { // TODO придумать альтернативу instanceof;
    Card.onMarkAsWatched = () => { // TODO вынести общую логику нажатия на кнопку в функцию
      defaultCardData.states.isWatched = !defaultCardData.states.isWatched;
      ProviderComponent.updateMovie({id: Card.id, data: defaultCardData.toRaw()})
        .then((updatedCardData) => {
          defaultCardData = updatedCardData;
          Card.updateData(defaultCardData);
          Popup.updateData(defaultCardData);
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
        defaultCardData.states.isWatched = !defaultCardData.states.isWatched;
      });
    };
    Card.onAddToWatchList = () => {
      defaultCardData.states.isInWatchList = !defaultCardData.states.isInWatchList;
      ProviderComponent.updateMovie({id: Card.id, data: defaultCardData.toRaw()})
        .then((updatedCardData) => {
          defaultCardData = updatedCardData;
          Card.updateData(defaultCardData);
          Popup.updateData(defaultCardData);
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
          defaultCardData.states.isInWatchList = !defaultCardData.states.isInWatchList;
        });
    };
  }

  Popup.onMarkAsWatched = () => {
    Popup.setState(`isWatched`, !Popup.states.isWatched);
    Popup.updateFilmsControlButtons();
    Card.setState(`isWatched`, Popup.states.isWatched);
    Card.addActiveClassForMarkAsWatched(Popup.states.isWatched); // Не должно быть актуально для экстра-карточек!
  };
  Popup.onAddToWatchList = () => {
    Popup.setState(`isInWatchList`, !Popup.states.isInWatchList);
    Popup.updateFilmsControlButtons();
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
