// Getting token from localStorage
export const getLocalStorage = () => {
  return window.localStorage.getItem("token");
};

// Save token on the context
export const saveLocalStorageDroneMaster = (key, item) => {
  return window.localStorage.setItem(key, item);
};

// Delete token from localStorage when user logout
export const delLocalStorage = (item) => {
  return window.localStorage.removeItem(item);
};
