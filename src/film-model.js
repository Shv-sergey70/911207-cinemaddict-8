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

  toRaw() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'poster': this.poster,
        'runtime': this.duration,
        'actors': this.actors,
        'genre': this.genres,
        'age_rating': this.ageRate,
        'director': this.director,
        'writers': this.writers,
        'total_rating': this.rating,
        'release': {
          'date': this.releaseDate,
          'release_country': this.releaseCountry
        }
      },
      'comments': this.comments,
      'user_details': {
        'watchlist': this.states.isInWatchList,
        'already_watched': this.states.isWatched,
        'favorite': this.states.isFavorite,
        'personal_rating': this.ownRating,
        'watching_date': this.watchingTimestamp
      }
    };
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(filmsData) {
    return filmsData.map(FilmModel.parseFilm);
  }
}
