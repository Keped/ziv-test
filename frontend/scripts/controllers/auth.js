// this controller takes care of auth logic.
function AuthControlMaker(App) {
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
  const checkAuthStatus = async function () {
    try {
      const oldToken = App.StorageService.get(TAB_SESSION_TOKEN);
      console.log(oldToken);
      const result = await ApiService.authenticate(oldToken);
      const { token, user } = result;
      if (token) {
        return onAuthorized(token, user);
      }
      return onUnAuthorized();
    } catch (e) {
      return onUnAuthorized();
    }
  };
  const logIn = async function (name, password) {
    try {
      App.GuiService.setCurrentTemplate('loading');
      const result = await ApiService.logIn(name, password);
      console.log(result);
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

  const signUp = async function (name, password) {
    try {
      App.GuiService.setCurrentTemplate('loading');
      const result = await ApiService.signUp(name, password);
      console.log(result);
      if (result.error) {
        throw new Error(result.error);
      } else {
        App.GuiService.showModal('success', 'Great!', 'Signed up successfuly, now you can login');
        this.setCurrentTemplate('loginTemplate');
        return true;
      }
    } catch (e) {
      App.GuiService.setCurrentTemplate('signupTemplate');
      App.GuiService.showModal('error', 'Oops!', 'signup failed...');
    }
  };
  const logOut = function () {
    const token = App.StorageService.get(TAB_SESSION_TOKEN);
    ApiService.logOut(token).then((res) => {});
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
window.AuthControlMaker = AuthControlMaker;
