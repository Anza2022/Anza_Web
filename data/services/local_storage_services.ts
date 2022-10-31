import { isBrowser } from "../../presentation/utils/helper_functions";

function saveInLocalStorage(key: string, value: string) {
  if (isBrowser()) {
    window.localStorage.setItem(key, value);
  } else {
    return null;
  }
}

function retrieveFromLocalStorage(key: string) {
  //will return null if key does not exist
  if (isBrowser()) {
    const value = window.localStorage.getItem(key);
    return value;
  } else {
    return null;
  }
}

function deleteFromLocalStorage(key: string) {
  if (isBrowser()) {
    window.localStorage.removeItem(key);
  } else {
    return null;
  }
}

function deleteAuthTokensFromStorage() {
  deleteFromLocalStorage("access_token");
  deleteFromLocalStorage("refresh_token");
}

export {
  saveInLocalStorage,
  retrieveFromLocalStorage,
  deleteFromLocalStorage,
  deleteAuthTokensFromStorage,
};
