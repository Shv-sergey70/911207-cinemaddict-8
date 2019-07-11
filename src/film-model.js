export default class FilmModel {
  constructor(data) {
    this.id = data.id;
    this.title = data[`film_info`][`title`];
    this.rating = data[`film_info`][`total_rating`];
    this.releaseDate = data[`film_info`][`release`][`date`];
    this.releaseCountry = data[`film_info`][`release`][`release_country`];
    this.genres = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.duration = data[`film_info`][`runtime`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.ageRate = data[`film_info`][`age_rating`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.comments = data[`comments`];
    this.states = {
      isInWatchList: data[`user_details`][`watchlist`],
      isWatched: data[`user_details`][`already_watched`],
      isFavorite: data[`user_details`][`favorite`]
    };
    this.ownRating = data[`user_details`][`personal_rating`];
    this.watchingTimestamp = data[`user_details`][`watching_date`];
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(filmsData) {
    return filmsData.map(FilmModel.parseFilm);
  }
}
