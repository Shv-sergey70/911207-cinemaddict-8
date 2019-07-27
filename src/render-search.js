import Search from './search';
import {ProviderComponent} from "./main";
import {renderMainFilms} from "./render-films";

const header = document.querySelector(`.header`);
const headerProfile = header.querySelector(`.header__profile`);
const messageBlock = document.querySelector(`.films-list__title`);

export const renderSearch = (filmsData) => {
  const SearchComponent = new Search(filmsData);
  SearchComponent.onSearchKeydownFunc = (evt) => {
    ProviderComponent.getMovies()
      .then((movies) => {
        const filteredMovies = SearchComponent.searchMoviesByTitle(movies, evt.target.value);
        showNotFoundMoviesMessage(filteredMovies.length === 0);
        renderMainFilms(filteredMovies);
      });
  };
  header.insertBefore(SearchComponent.render(), headerProfile);
};

const showNotFoundMoviesMessage = (isShow) => {
  if (isShow) {
    messageBlock.textContent = `Not found any movies`;
    messageBlock.classList.remove(`visually-hidden`);
  } else {
    messageBlock.classList.add(`visually-hidden`);
  }
};
