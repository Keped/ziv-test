function domReady(fn) {
  // If we're early to the party
  document.addEventListener('DOMContentLoaded', fn);
  // If late; I mean on time.
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn();
  }
}

const compareLists = (a, b) => {
  // let equal
  if (a && b) {
    return serializeObjectArray(a) === serializeObjectArray(b);
  }
  return false;
};

const flattenMapToArray = (obj) => Object.keys(obj).map(k=>obj[k]);
// trying to save rendering work
const serializeObjectArray = (dataMap) =>  {
  const objectsArr = [...dataMap].sort();
  let result = '';
  objectsArr.forEach((obj)=>{
    result += JSON.stringify(obj, Object.keys(obj).sort());
  });
  return result;
};

// this is our app startup
domReady(() => {
  // show spinner
  setCurrentTemplate('loading', null);
  // checked if logged in in the server
  checkAuthStatus().then((res) => {
  }).catch((e) => {
    // login expired or never was
    setCurrentTemplate('loginTemplate', null);
  });
  // initialize storage so we don't have hangovers
  StorageService.set(LIST_MAP_TOKEN, {});
  setInterval(() => {
    // if we have a token (cached from before page refresh of new from /auth/login) 
    // we can try to get data
    const token = StorageService.get(TAB_SESSION_TOKEN);
    if (token && token !== 'null') {
      // go for data from server
      ApiService.getList(token).then((res) => {
        // have we got it?
        const { resultList } = res;
        if (!resultList) {
          return;
        }
        // get map from storage for comparison
        let lastResultMap = StorageService.get(LIST_MAP_TOKEN);
        lastResultMap = lastResultMap ? JSON.parse(lastResultMap) : false;
        // save for the same usage
        StorageService.set(LIST_MAP_TOKEN, JSON.stringify(resultList));
        // make list for easier comparison and rendering
        const resultArray = flattenMapToArray(resultList);
        if (!lastResultMap || !compareLists(resultArray, flattenMapToArray(lastResultMap))) {
          setCurrentTemplate('listTemplate', resultArray); // render!
        }
      });
    }
  }, 30 * 100);
});
