import {getRandomArrayValue, getRandomDecimal, getRandomIntegerInRange, YEAR_TIMESTAMP_MS} from "./utility";

const FILMS_TITLES = [
  `The 400 Blows`,
  `La Haine`,
  `The Godfather`,
  `The Godfather: Part II`,
  `Man Bites Dog`,
  `The Departed`,
  `Umberto D.`,
  `White Heat`,
  `Dirty Dancing`,
  `Disclosure`,
  `District 9`,
  `Empire Records`,
  `Enchanted`,
  `End of Days`,
  `Enemy at the Gates`
];
const DIRECTORS = [
  `Stanley Kubrick`,
  `David Fincher`,
  `Bryan Singer`,
  `Brian De Palma`,
  `Hayao Miyazaki`
];

const WRITERS = [
  `Christopher Nolan`,
  `Joel Coen`,
  `Paul Thomas Anderson`,
  `Jason Reitman`,
  `Charlie Kaufman`,
  `Quentin Tarantino`
];

const actors = {
  MIN: 1,
  MAX: 5,
  LIST: [
    `Jack Nicholson`,
    `Marlon Brando`,
    `Robert De Niro`,
    `Al Pacino`,
    `Daniel Day-Lewis`,
    `Dustin Hoffman`,
    `Tom Hanks`,
    `Anthony Hopkins`
  ]
};

const COUNTRIES = [
  `USA`,
  `UK`,
  `France`,
  `Italy`,
  `Canada`
];
const genres = {
  MIN: 1,
  MAX: 4,
  LIST: [
    `Comedy`,
    `Drama`,
    `History`,
    `Action`,
    `Detective`,
    `Horror`,
    `Thriller`
  ]
};
const POSTERS = [
  `accused`,
  `blackmail`,
  `blue-blazes`,
  `fuga-da-new-york`,
  `moonrise`,
  `three-friends`
];
const comments = {
  MIN: 1,
  MAX: 10,
  TEXT: [
    `Very nice`,
    `I don't like cartoons`,
    `So boring! Could barely watch till the end!`,
    `Disaster!`,
    `May be they didn't realise it was meant to be a comedy?`,
    `OMG! This villain is soooooo cute!`,
    `I love happy endings!`,
    `My life would never be the same again...`,
    `How to unwatch this?!`,
    `Why they always have to make stupid decisions?`,
    `Have to reconsider my attitude towards this approach now.`,
    `The BEST movie EVER!`
  ]
};
const AGE_RATES = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`
];
const rates = {
  MIN: 1,
  MAX: 10
};
const EMOJI = {
  'emoji-sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`
};
const AUTHORS = [
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Daniel Day-Lewis`,
  `Dustin Hoffman`,
  `Tom Hanks`,
  `Anthony Hopkins`
];
const FILMS_DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const filmsDescriptionsArray = FILMS_DESCRIPTIONS.split(`. `);
const generateDescription = () => {
  const numberOfSentences = getRandomIntegerInRange(1, 3);
  const descriptionArray = [];
  for (let i = 0; i < numberOfSentences; i++) {
    descriptionArray.push(getRandomArrayValue(filmsDescriptionsArray));
  }

  return descriptionArray.join(`. `);
};
const generateUniqueValuesArrayInRangeFrom = (arr, minValuesCount, maxValuesCount) => {
  const resultArr = [];
  const arrCopy = [...arr];

  for (let i = 0; i < getRandomIntegerInRange(minValuesCount, maxValuesCount); i++) {
    resultArr.push(arrCopy.splice(getRandomIntegerInRange(0, arrCopy.length - 1), 1)[0]);
  }

  return resultArr;
};
const getComments = () => {
  const commentsArr = [];

  for (let i = 0; i < getRandomIntegerInRange(comments.MIN, comments.MAX); i++) {
    commentsArr.push({
      emoji: getRandomArrayValue(Object.values(EMOJI)),
      text: getRandomArrayValue(comments.TEXT),
      author: getRandomArrayValue(AUTHORS),
      dateAdded: getRandomIntegerInRange(Date.now() - YEAR_TIMESTAMP_MS, Date.now())
    });
  }

  return commentsArr;
};

export const getFilmCardData = () => ({
  title: getRandomArrayValue(FILMS_TITLES),
  rating: getRandomDecimal(1, 10),
  releaseDate: new Date(getRandomIntegerInRange(1970, 2019), getRandomIntegerInRange(0, 1), getRandomIntegerInRange(1, 31)),
  genres: generateUniqueValuesArrayInRangeFrom(genres.LIST, genres.MIN, genres.MAX),
  poster: `./images/posters/${getRandomArrayValue(POSTERS)}.jpg`,
  description: generateDescription(),
  comments: getComments(),
  duration: getRandomIntegerInRange(50, 200),
  director: getRandomArrayValue(DIRECTORS),
  writers: getRandomArrayValue(WRITERS),
  actors: generateUniqueValuesArrayInRangeFrom(actors.LIST, actors.MIN, actors.MAX),
  country: getRandomArrayValue(COUNTRIES),
  ageRate: getRandomArrayValue(AGE_RATES),
  get rates() {
    const ratesArr = [];
    for (let i = rates.MIN; i <= rates.MAX; i++) {
      ratesArr.push(i);
    }

    return ratesArr;
  },
  emoji: EMOJI,
  states: {
    isInWatchList: false,
    isWatched: false,
    isFavorite: false
  }
});

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
