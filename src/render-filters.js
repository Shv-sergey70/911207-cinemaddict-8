import {filtersData} from "./data";
import Filter from "./filter";
import {renderMainFilms} from "./render-films";
import {clearHtmlBlock} from "./utility";

const showMainFilmsBlock = (state) => {
  if (state) {
    document.querySelector(`.films`).classList.remove(`visually-hidden`);
  } else {
    document.querySelector(`.films`).classList.add(`visually-hidden`);
  }
};

export const createFilters = (filmsData, statistic) => {
  const mainNavigationBlock = document.querySelector(`.main-navigation`);
  clearHtmlBlock(mainNavigationBlock);

  filtersData.forEach((filterData) => {
    const FilterClass = new Filter(filterData);

    switch (filterData.id) {
      case `watchlist`: {
        FilterClass.onFilter = () => {
          statistic.remove();
          showMainFilmsBlock(true);
          renderMainFilms(filmsData.filter((cardData) => cardData.states.isInWatchList));
        };

        FilterClass.filmsCount = filmsData.filter((cardData) => cardData.states.isInWatchList).length;

        break;
      }
      case `history`: {
        FilterClass.onFilter = () => {
          statistic.remove();
          showMainFilmsBlock(true);
          renderMainFilms(filmsData.filter((cardData) => cardData.states.isWatched));
        };

        FilterClass.filmsCount = filmsData.filter((cardData) => cardData.states.isWatched).length;

        break;
      }
      case `favorites`: {
        FilterClass.onFilter = () => {
          statistic.remove();
          showMainFilmsBlock(true);
          renderMainFilms(filmsData.filter((cardData) => cardData.states.isFavorite));
        };

        FilterClass.filmsCount = filmsData.filter((cardData) => cardData.states.isFavorite).length;

        break;
      }
      case `all`: {
        FilterClass.onFilter = () => {
          statistic.remove();
          showMainFilmsBlock(true);
          document.querySelector(`.films`).classList.remove(`visually-hidden`);
          renderMainFilms(filmsData);
        };

        break;
      }
      case `stats`: {
        FilterClass.onFilter = () => {
          statistic.remove();
          showMainFilmsBlock(false);
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
