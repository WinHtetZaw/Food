export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const filterProperties = (obj, conditionFn) => {
  const filteredObj = {};
  for (const key in obj) {
    if (conditionFn(key, obj[key])) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
};

export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
