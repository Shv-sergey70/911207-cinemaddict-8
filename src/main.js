import Statistic from "./statistic";
import API from './backend/api';
import {renderMainFilms, renderMostCommentedFilms, renderTopRatedFilms} from "./render-films";
import {renderFilters} from "./filters/render-filters";
import {renderStatistic} from "./render-statistic";
export const ApiClass = new API();

const titleElement = document.querySelector(`.films-list__title`);

titleElement.classList.remove(`visually-hidden`);
ApiClass.getMovies()
  .then((filmsData) => {
    titleElement.classList.add(`visually-hidden`);
    const StatisticClass = new Statistic(filmsData);
    document.querySelector(`.films`).classList.remove(`visually-hidden`);
    renderFilters(filmsData, StatisticClass);
    renderStatistic(StatisticClass);
    renderMainFilms(filmsData);
    renderTopRatedFilms(filmsData);
    renderMostCommentedFilms(filmsData);
  })
  .catch((error) => {
    console.error(`Caught an error: ${error}`);
    titleElement.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
  });
