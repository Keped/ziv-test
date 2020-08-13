function domReady(fn) {
  // If we're early to the party
  document.addEventListener('DOMContentLoaded', fn);
  // If late; I mean on time.
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();
  }
}
const serialize = function (obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
};
const compareLists = function (a, b) {
  if (a && b) {
    return serialize(a) === serialize(b);
  }
  return false;
};
let needChange = true;
domReady(() => {
  setCurrentTemplate('loading', null);
  checkAuthStatus().then((res) => {
    // setMainTitle(res)

  }).catch((e) => {
    setCurrentTemplate('loginTemplate', null);
  });

  setInterval(() => {
    const token = StorageService.get(TAB_SESSION_TOKEN);
    const lastResultMap = StorageService.get(LIST_MAP_TOKEN);
    if (token && token !== 'null') {
      console.log(`${token} !!!!!!!!!!!`);
      ApiService.getList(token).then((res) => {
        needChange = false;
        const newMap = {};
        res.list.map((loginData) => {
          newMap[loginData._id] = loginData;
        });
        StorageService.set(LIST_MAP_TOKEN, JSON.stringify(newMap));
        if (compareLists(newMap, JSON.parse(lastResultMap))) {
          setCurrentTemplate('listTemplate', res.list);
        }
      });
    }
  }, 30 * 100);

});
