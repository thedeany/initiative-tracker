export const setLocalStorage = data => {
  localStorage.setItem('initiative-tracker', JSON.stringify(data));
};

export const getLocalStorage = () => {
  if (localStorage.getItem('initiative-tracker')) {
    return JSON.parse(localStorage.getItem('initiative-tracker'));
  }
};
