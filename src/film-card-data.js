import {getRandomArrayValue, getRandomDecimal, getRandomIntegerInRange} from "./utility";

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
const GENRES = [
  `Comedy`,
  `Drama`,
  `History`,
  `Action`,
  `Detective`,
  `Horror`,
  `Thriller`
];
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
const getComments = () => {
  const commentsNumber = getRandomIntegerInRange(comments.MIN, comments.MAX);
  const commentsArr = [];

  for (let i = 0; i < commentsNumber; i++) {
    commentsArr.push(getRandomArrayValue(comments.TEXT));
  }

  return commentsArr;
};

export default () => ({
  title: getRandomArrayValue(FILMS_TITLES),
  rating: getRandomDecimal(1, 10),
  year: getRandomIntegerInRange(1970, 2019),
  genre: getRandomArrayValue(GENRES),
  poster: `./images/posters/${getRandomArrayValue(POSTERS)}.jpg`,
  description: generateDescription(),
  comments: getComments(),
  get duration() {
    const timeMinutes = getRandomIntegerInRange(50, 90);
    return `${Math.floor(timeMinutes / 60)}h&nbsp;${timeMinutes % 60}m`;
  }
});
