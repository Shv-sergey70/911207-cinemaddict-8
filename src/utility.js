export const getRandomIntegerInRange = (min, max) => {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
};
export const clearHtmlBlock = (domElement) => {
  domElement.innerText = ``;
};
export const createDomElement = (template) => {
  const divElement = document.createElement(`div`);
  divElement.insertAdjacentHTML(`afterbegin`, template);

  return divElement.firstChild;
};

export const isFunction = (func) => typeof func === `function`;

export const showMainFilmsBlock = (state) => {
  if (state) {
    document.querySelector(`.films`).classList.remove(`visually-hidden`);
  } else {
    document.querySelector(`.films`).classList.add(`visually-hidden`);
  }
};

export const Keys = {
  ESC: `Escape`
};
