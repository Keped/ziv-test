// this controller takes care of auth logic.
const AuthControlMaker = (App) => {
  const { TAB_SESSION_TOKEN } = App.StorageService;
  const onUnAuthorized = () => {
    App.StorageService.set(TAB_SESSION_TOKEN, null);
    App.GuiService.setUserBox(false);
    App.GuiService.setCurrentTemplate('loginTemplate');
    return false;
  };
  const onAuthorized = (token, user) => {
    App.StorageService.set(TAB_SESSION_TOKEN, token);
    App.GuiService.setUserBox(user);
    return `User: ${user.name}`;
  };
  const checkAuthStatus = async () => {
    try {
      const oldToken = App.StorageService.get(TAB_SESSION_TOKEN);
      const result = await App.ApiService.authenticate(oldToken);
      const { token, user } = result;
      if (token) {
        return onAuthorized(token, user);
      }
      return onUnAuthorized();
    } catch (e) {
      return onUnAuthorized();
    }
  };
  const logIn = async (name, password) => {
    try {
      App.GuiService.setCurrentTemplate('loading');
      const result = await App.ApiService.logIn(name, password);
      const { token, user } = result;
      if (token) {
        App.GuiService.showModal('success', 'Great!', 'login successful...');
        return onAuthorized(token, user);
      }
      throw new Error('oh oh');
    } catch (e) {
      App.GuiService.showModal('error', 'Oops!', 'login failed...');
      App.GuiService.setCurrentTemplate('loginTemplate');
      return onUnAuthorized();
    }
  };

  const signUp = async (name, password) => {
    try {
      App.GuiService.setCurrentTemplate('loading');
      const result = await App.ApiService.signUp(name, password);
      if (result.error) {
        throw new Error(result.error);
      } else {
        App.GuiService.showModal('success', 'Great!', 'Signed up successfuly, now you can login');
        App.GuiService.setCurrentTemplate('loginTemplate');
        return true;
      }
    } catch (e) {
      App.GuiService.setCurrentTemplate('signupTemplate');
      App.GuiService.showModal('error', 'Oops!', 'signup failed...');
    }
  };
  const logOut = function () {
    const token = App.StorageService.get(TAB_SESSION_TOKEN);
    App.ApiService.logOut(token).then((res) => {});
    App.GuiService.showModal('success', 'Bye', 'Signed out.');
    onUnAuthorized();
  };
  return ({
    logIn,
    logOut,
    checkAuthStatus,
    signUp,
  });
}
// JSDOM vs. Browser
if (typeof module === 'undefined') {
  window.AuthControlMaker = AuthControlMaker;
} else {
  module.exports = AuthControlMaker;
}
