import Statistic from "./statistic";
import API from './backend/api';
import {renderMainFilms, renderMostCommentedFilms, renderTopRatedFilms} from "./render-films";
import {renderFilters} from "./filters/render-filters";
import {renderStatistic} from "./render-statistic";
import {showMainFilmsBlock} from "./utility";
import Store from "./store";
import Provider from "./provider";
import {FILMS_STORE_KEY} from "./constants";
export const ApiClass = new API();

const StoreComponent = new Store({storageKey: FILMS_STORE_KEY, storage: localStorage});
export const ProviderComponent = new Provider({api: ApiClass, store: StoreComponent});
const titleElement = document.querySelector(`.films-list__title`);

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
});

window.addEventListener(`offline`, () => {
  document.title += `[OFFLINE]`;
});

navigator.serviceWorker.register(`./service-worker.js`)
  .catch((error) => console.log(`FAILED registration of SW: ${error}`));

const showLoadingMessage = (state, message = ``) => {
  titleElement.classList.remove(`visually-hidden`);
  titleElement.textContent = message;
};

showLoadingMessage(true, `Loading movies...`);
ProviderComponent.getMovies()
  .then((filmsData) => {
    showLoadingMessage(false);
    const StatisticClass = new Statistic(filmsData);
    showMainFilmsBlock(true);
    renderFilters(filmsData, StatisticClass);
    renderStatistic(StatisticClass);
    renderMainFilms(filmsData);
    renderTopRatedFilms(filmsData); // TODO синхронизовать стейт одинаковых карточек тут и в главной галерее фильмов
    renderMostCommentedFilms(filmsData); // TODO то же что и выше
  })
  .catch((error) => {
    console.error(`Caught an error: ${error}`);
    showLoadingMessage(true, `Something went wrong while loading movies. Check your connection or try again later`);
  });
