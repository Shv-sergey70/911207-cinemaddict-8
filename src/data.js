import {getRandomIntegerInRange} from "./utility";

export const filtersData = [
  {
    name: `All movies`,
    id: `all`,
    isChecked: true
  },
  {
    name: `Watchlist`,
    id: `watchlist`,
    isChecked: false,
    filmsCount: getRandomIntegerInRange(1, 100)
  },
  {
    name: `History`,
    id: `history`,
    isChecked: false,
    filmsCount: getRandomIntegerInRange(1, 100)
  },
  {
    name: `Favorites`,
    id: `favorites`,
    isChecked: false,
    filmsCount: getRandomIntegerInRange(1, 100)
  },
  {
    name: `Stats`,
    id: `stats`,
    isChecked: false,
    isAdditional: true
  }
];
