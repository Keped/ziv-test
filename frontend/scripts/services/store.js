const StorageServiceMaker = () => {
  const mock = { getItem: (k, v) => v, setItem: () => {} };
  const storage = typeof window !== 'undefined' ? window.sessionStorage : mock;
  const TAB_SESSION_TOKEN = 't_S-T';
  const LIST_MAP_TOKEN = 'L_m-T';
  const _storeItem = (key, value) => storage.setItem(key, value);
  const _fetchItem = (key, value) => storage.getItem(key);
  return {
    set: _storeItem,
    get: _fetchItem,
    TAB_SESSION_TOKEN,
    LIST_MAP_TOKEN,
  };
};

if (typeof module === 'undefined') {
  window.StorageServiceMaker = StorageServiceMaker;
} else {
  module.exports = StorageServiceMaker;
}
