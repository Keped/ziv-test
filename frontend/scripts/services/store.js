const storage = window.sessionStorage;
const TAB_SESSION_TOKEN = 't_S-T';
const LIST_MAP_TOKEN = 'L_m-T';

const _storeItem = (key, value) => storage.setItem(key, value);
const _fetchItem = (key, value) => storage.getItem(key);

const StorageService = {
  set: _storeItem,
  get: _fetchItem,
};
