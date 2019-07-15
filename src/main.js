import Statistic from "./statistic";
import API from './backend/api';
import {renderMainFilms, renderMostCommentedFilms, renderTopRatedFilms} from "./render-films";
import {renderFilters} from "./filters/render-filters";
import {renderStatistic} from "./render-statistic";
import {showMainFilmsBlock} from "./utility";
export const ApiClass = new API();

const titleElement = document.querySelector(`.films-list__title`);

const showLoadingMessage = (state, message = ``) => {
  titleElement.classList.remove(`visually-hidden`);
  titleElement.textContent = message;
};

showLoadingMessage(true, `Loading movies...`);
ApiClass.getMovies()
  .then((filmsData) => {
    showLoadingMessage(false);
    const StatisticClass = new Statistic(filmsData);
    showMainFilmsBlock(true);
    renderFilters(filmsData, StatisticClass);
    renderStatistic(StatisticClass);
    renderMainFilms(filmsData);
    renderTopRatedFilms(filmsData);
    renderMostCommentedFilms(filmsData);
  })
  .catch((error) => {
    console.error(`Caught an error: ${error}`);
    showLoadingMessage(true, `Something went wrong while loading movies. Check your connection or try again later`);
  });
