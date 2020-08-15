/* eslint-disable no-underscore-dangle */
const ApiServiceMaker = () => {
  let isLoading = false;

  const _request = async function (method, url, data, token) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.client_token = token;
    }
    try {
      isLoading = true;
      const response = await fetch(url, {
        method,
        body: data && JSON.stringify(data),
        headers,
      });
      isLoading = false;
      return response.json();
    } catch (e) {
      isLoading = false;
      throw (e);
    }
  };
  return {
    logIn: async (name, password) => _request('POST', ROUTES.LOGIN, { name, password }),
    signUp: async (name, password) => _request('POST', ROUTES.SIGNUP, { name, password }),
    authenticate: async (token) => _request('POST', ROUTES.AUTHENTICATE, {}, token),
    getList: async (token) => _request('POST', ROUTES.ACTIVE_LIST, null, token),
    getDetails: async (userId) => _request('POST', ROUTES.DETAILS, { user_id: userId }, token),
    logOut: async (token) => _request('POST', ROUTES.LOGOUT, {}, token),
  };
};
// JSDOM vs. Browser
if (typeof module === 'undefined') {
  window.ApiServiceMaker = ApiServiceMaker;
} else {
  module.exports = ApiServiceMaker;
}
