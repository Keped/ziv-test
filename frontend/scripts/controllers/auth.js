const onUnAuthorized = function() {
  StorageService.set(TAB_SESSION_TOKEN, null);
  GuiService.setUserBox(false);
  GuiService.setCurrentTemplate('loginTemplate');
  return false;
};
const onAuthorized = function(token, user) {
  StorageService.set(TAB_SESSION_TOKEN, token);
  GuiService.setUserBox(user);
  return `User: ${user.name}`;
};
const checkAuthStatus = async function () {
  try {
    const oldToken = StorageService.get(TAB_SESSION_TOKEN);
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
    const result = await ApiService.logIn(name, password);
    console.log(result);
    const { token, user } = result;
    if (token) {
      return onAuthorized(token, user);
    }
    return onUnAuthorized();
  } catch (e) {
    return onUnAuthorized();
  }
};

const signUp = async function (name, password) {
  try {
    const result = await ApiService.signUp(name, password);
    console.log(result);
    if (result.error) {
      console.error(result.error);
    } else {
      // appStatus = 'authorized';
      return true;
    }
  } catch (e) {

  }
};
const logOut = function () {
  const token = StorageService.get(TAB_SESSION_TOKEN);
  ApiService.logOut(token).then((res) => {});
  onUnAuthorized();
};

window.AuthControl = {
  async logIn(name, password) {
    try {
      const result = await ApiService.logIn(name, password);
      console.log(result);
      const { token, user } = result;
      if (token) {
        return onAuthorized(token, user);
      }
      return onUnAuthorized();
    } catch (e) {
      return onUnAuthorized();
    }
  },
  logOut() {
    const token = StorageService.get(TAB_SESSION_TOKEN);
    ApiService.logOut(token).then((res) => {});
    onUnAuthorized();
  },
  async signUp(name, password) {
    try {
      const result = await ApiService.signUp(name, password);
      console.log(result);
      if (result.error) {
        console.error(result.error);
      } else {
        // appStatus = 'authorized';
        return true;
      }
    } catch (e) {
    //
    }
  },
};