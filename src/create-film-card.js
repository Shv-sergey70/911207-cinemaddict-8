import getFilmCardData from './film-card-data.js';

const createCard = (cardData, isMain = false) => {
  return `<article class="film-card ${isMain ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${cardData.title}</h3>
          <p class="film-card__rating">${cardData.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${cardData.year}</span>
            <span class="film-card__duration">${cardData.duration}</span>
            <span class="film-card__genre">Comedy</span>
          </p>
          <img src="${cardData.poster}" alt="" class="film-card__poster">
          ${isMain ? `<p class="film-card__description">${cardData.description}</p>` : ``}
          <button class="film-card__comments">13 comments</button>

          ${isMain ? `
<form class="film-card__controls">
<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
<button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
<button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
</form>` : ``}
        </article>`;
};

export default (amount, isMain = false) => {
  const cards = [];
  for (let i = 0; i < amount; i++) {
    cards.push(createCard(getFilmCardData(), isMain));
  }
  return cards;
};
