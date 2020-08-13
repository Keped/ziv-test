const storage = window.sessionStorage;
var TAB_SESSION_TOKEN = 't_S-T';
var LIST_MAP_TOKEN = 'L_m-T';

const _storeItem = (key,value) =>storage.setItem(key,value);
const _fetchItem = (key,value) =>storage.getItem(key);

var StorageService = {
    set:_storeItem,
    get:_fetchItem
}