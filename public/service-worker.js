const CACHE_NAME = `STATIC_V1.0`;

self.addEventListener(`install`, (evt) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./bundle.js`,
        `./css/main.css`,
        `./css/normalize.css`,
        `./images/posters/accused.jpg`,
        `./images/posters/blackmail.jpg`,
        `./images/posters/blue-blazes.jpg`,
        `./images/posters/fuga-da-new-york.jpg`,
        `./images/posters/moonrise.jpg`,
        `./images/posters/three-friends.jpg`,
        `./images/background.png`,
        `./images/icon-favorite.png`,
        `./images/icon-favorite.svg`,
        `./images/icon-watchlist.png`,
        `./images/icon-watchlist.svg`,
        `./images/icon-watched.png`,
        `./images/icon-watched.svg`
      ])
    })
    .catch((error) => console.log(`INSTALL ERROR: ${error}`));
  evt.waitUntil(openCache);
});

const fromNetwork = (request) => {
  const timeout = 1000;

  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);

    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      // console.log(`FROM NETWORK: ${request.url}`);
      fulfill(response);
    }, reject);
  })
}

const fromCache = (request) => {
  // console.log(`FROM CACHE: ${request.url}`);
  return caches.open(CACHE_NAME)
    .then((cache) => {
      // console.log(cache.keys().then((keys) => console.log(keys)));
      // console.log(request);
      return cache.match(request)
        .then((matching) => {
          // console.log(matching);
          return matching ? matching : matching;
        })
    })
}

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(fromNetwork(evt.request)
    .catch(() => fromCache(evt.request)))
});
