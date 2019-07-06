const getRandomIntegerInRange = (min, max) => {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
};
const getRandomArrayValue = (arr) => {
  return arr[getRandomIntegerInRange(0, arr.length - 1)];
};
const getRandomDecimal = (min, max) => {
  return ((Math.random() * (max - min)) + min).toFixed(1);
};
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

export default () => ({
  title: getRandomArrayValue(FILMS_TITLES),
  rating: getRandomDecimal(1, 10),
  year: getRandomIntegerInRange(1970, 2019),
  genre: getRandomArrayValue(GENRES),
  poster: `./images/posters/${getRandomArrayValue(POSTERS)}.jpg`,
  description: generateDescription(),
  get duration() {
    const timeMinutes = getRandomIntegerInRange(50, 90);
    return `${Math.floor(timeMinutes / 60)}h&nbsp;${timeMinutes % 60}m`;
  }
});
