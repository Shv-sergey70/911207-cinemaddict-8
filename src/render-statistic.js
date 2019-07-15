import {createDomElement, showMainFilmsBlock} from "./utility";
import {deactivateFilters} from "./filters/render-filters";

const statsLink = `#stats`;
const statisticButtonTemplate = `<a href="${statsLink}" class="main-navigation__item main-navigation__item--additional">Stats</a>`.trim();
const mainNavigationBlock = document.querySelector(`.main-navigation`);
const statisticButton = createDomElement(statisticButtonTemplate);

export const setActiveStatsButton = (state) => {
  if (state) {
    statisticButton.classList.add(`main-navigation__item--active`);
  } else {
    statisticButton.classList.remove(`main-navigation__item--active`);
  }
};

export const renderStatistic = (StatisticComponent) => {
  StatisticComponent.setOnStatisticButtonClickCallbackFunc = () => {
    deactivateFilters();
    setActiveStatsButton(true);
    StatisticComponent.remove();
    showMainFilmsBlock(false);
    document.querySelector(`main`).appendChild(StatisticComponent.render());
  };
  statisticButton.addEventListener(`click`, StatisticComponent.onStatisticButtonClickBinded);
  mainNavigationBlock.appendChild(statisticButton);
};
