import Component from "./component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default class Statistic extends Component {
  constructor(cardsData) {
    super();

    this._cardsData = cardsData;

    this._watchedFilmsCardsData = null;
    this._actualGenres = null;
    this._filmsCountByGenre = null;
    this._totalDurationFormatted = null;
    this._topGenre = null;
    this._chart = null;

    // this.onStatisticClick = this._onStatisticClick.bind(this);

    this._update();
  }

  // set onStatistic(func) {
  //   this._onStatistic = func;
  // }

  // _onStatisticClick() {
  //   return typeof this._onStatistic === `function` && this._onStatistic();
  // }

  _getTotalDurationFormatted() {
    const totalDuration = this._watchedFilmsCardsData.reduce((defaultValue, cardData) => {
      return defaultValue + cardData.duration;
    }, 0);

    return `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`;
  }

  _countFilmsByGenre() {
    const filmsCountByGenre = [];
    this._actualGenres.forEach((genre) => {
      filmsCountByGenre.push({
        name: genre,
        count: this._watchedFilmsCardsData.filter((cardData) => cardData.genres.some((cardGenre) => cardGenre === genre)).length
      });
    });

    filmsCountByGenre.sort((a, b) => {
      return b.count - a.count;
    });

    return filmsCountByGenre;
  }

  _getActualGenres() {
    const genresSet = new Set();
    this._watchedFilmsCardsData.forEach((filmCard) => {
      filmCard.genres.forEach((genre) => {
        genresSet.add(genre);
      });
    });

    return genresSet;
  }

  _update() {
    this._watchedFilmsCardsData = this._cardsData.filter((cardData) => cardData.states.isWatched);
    this._actualGenres = this._getActualGenres();
    this._filmsCountByGenre = this._countFilmsByGenre();
    this._topGenre = this._filmsCountByGenre.length !== 0 ? this._filmsCountByGenre[0].name : 'none';
    this._totalDurationFormatted = this._getTotalDurationFormatted();
  }

  get _template() {
    return `
   <section class="statistic">
    <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._watchedFilmsCardsData.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${this._totalDurationFormatted}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`.trim();
  }

  render() {
    this._update();
    super.render();
    const statisticCtx = this._element.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * 5;

    this._chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._filmsCountByGenre.map((it) => it.name),
        datasets: [{
          data: this._filmsCountByGenre.map((it) => it.count),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });

    return this._element;
  }
}
