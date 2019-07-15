import {filtersData} from "../data";
import Filter from "./filter";
import {renderMainFilms} from "../render-films";
import {clearHtmlBlock, showMainFilmsBlock} from "../utility";
import {setActiveStatsButton} from "../render-statistic";

const getFilteredFilms = (filterName, filmsData) => {
  switch (filterName) {
    case `Watchlist`: {
      return filmsData.filter((filmData) => filmData.states.isInWatchList);
    }
    case `History`: {
      return filmsData.filter((filmData) => filmData.states.isWatched);
    }
    case `Favorites`: {
      return filmsData.filter((filmData) => filmData.states.isFavorite);
    }
    case `All movies`: {
      return filmsData;
    }
    default: {
      throw new Error(`Unhandled case`);
    }
  }
};
const createFilters = () => {
  const filters = [];

  filtersData.forEach((filterData) => {
    filters.push(new Filter(filterData));
  });

  return filters;
};
export const getFilterByName = (filterName) => filters.filter((FilterComponent) => FilterComponent.name === filterName)[0];
export const deactivateFilters = () => {
  filters.forEach((FilterComponent) => {
    FilterComponent.setActive(false);
  });
};
export const getActiveFilterName = () => filters.filter((FilterComponent) => FilterComponent.isActive())[0].name;


const filters = createFilters();

export const renderFilters = (filmsData, statistic) => {
  const mainNavigationBlock = document.querySelector(`.main-navigation`);
  clearHtmlBlock(mainNavigationBlock);

  filters.forEach((FilterComponent) => {
    FilterComponent.onFilter = () => {
      deactivateFilters();
      setActiveStatsButton(false);
      FilterComponent.setActive(true);

      statistic.remove();
      showMainFilmsBlock(true);

      renderMainFilms(getFilteredFilms(FilterComponent.name, filmsData));
    };

    FilterComponent.filmsCount = getFilteredFilms(FilterComponent.name, filmsData).length;

    mainNavigationBlock.appendChild(FilterComponent.render());
  });
};
