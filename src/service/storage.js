import orUpgradeStorage from '../../script';

export default function saveItem(name, item) {
  localStorage.setItem(name, (JSON.stringify(item)));
  orUpgradeStorage(name);
}

export const getSavedItem = (name) => JSON.parse(localStorage.getItem(name));

export function saveItemSessionStorage(name, item) {
  sessionStorage.setItem(name, JSON.stringify(item));
}

export const getItemSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));