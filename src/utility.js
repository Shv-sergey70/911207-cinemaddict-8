export const getRandomIntegerInRange = (min, max) => {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
};
export const clearHtmlBlock = (domElement) => {
  domElement.innerText = ``;
};
export const getRandomArrayValue = (arr) => {
  return arr[getRandomIntegerInRange(0, arr.length - 1)];
};
export const getRandomDecimal = (min, max) => {
  return ((Math.random() * (max - min)) + min).toFixed(1);
};
export const createDomElement = (template) => {
  const divElement = document.createElement(`div`);
  divElement.insertAdjacentHTML(`afterbegin`, template);

  return divElement.firstChild;
};
