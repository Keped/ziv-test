const LoginTemplate = `<form id="loginTemplate" class="auth-form">
    <label for="name">
        Name
    </label>
    <input name="username" id="name"  autocomplete="username"/>
    <label for="password">
        Pass
    </label>
    <input name="password" id="pass" type="password" autocomplete="current-password"/>
    <span>
    <input name="submit" type="submit" value="Login" onClick="onLoginClicked()"></button>
    <input type="button" value="Go to Signup" onClick="setCurrentTemplate('signupTemplate')"></button>
  </form>`;

const SignupTemplate = `<form id="loginTemplate" class="auth-form">
<label for="name">
Name
</label>
<input name="username" id="name"  autocomplete="username"/>
<label for="password">
Pass
</label>
<input id="pass" name="password" type="password" autocomplete="new-password"/>
<label>
    Confirm Pass:
</label>
<input id="pass2" type="password" autocomplete="new-password"/>
<input type="submit" value="Sign Up" onClick="onSignupClicked()"></button>
<input type="button" value="Go to Login" onClick="setCurrentTemplate('loginTemplate')"></button>
</form>`;
const makeListTemplate = (list) => `<div id="listTemplate">${list}</div>`;

const setMainTitle = function (message) {
  const title = document.getElementById('pageTitle');
  title.innerHTML = message;
};
const setUserBox = function (userData) {
  const titleFound = document.getElementById('detailsFoundTitle');
  const detailsFoundArea = document.getElementById('detailsFoundArea');
  if (userData) {
    titleFound.innerHTML = userData.name;
    detailsFoundArea.style.visibility = 'visible';
  } else {
    detailsFoundArea.style.visibility = 'hidden';
  }
};
const createListFromResults = function (resultList) {
  let listView = '<ul>';
  resultList.sort((a, b) => a.counter - b.counter).map((userData) => {
    const topLogIns = userData.top_logins;
    const currentLogin = topLogIns[0];
    const lastLogin = topLogIns[1];
    let diffTime = Math.abs(new Date() - new Date(currentLogin.createdAt));
    let lastDiff = lastLogin ? Math.abs(new Date(lastLogin.lastUpdatedAt) - new Date(lastLogin.createdAt)) : '?';
    diffTime = Math.ceil(diffTime / (1000 * 60));
    lastDiff = lastDiff != '?' ? Math.ceil(lastDiff / (1000 * 60)) : lastDiff;
    if (topLogIns[0].active) {
      listView += `
                <li>
                    <a href="#" onClick="showDetails('${currentLogin.user._id}')">
                        <h4>${currentLogin.user.name}</h4>
                        <h6>Login time minutes (current/last): ${diffTime} / ${lastDiff}</h6>
                        <h6>Last update: ${currentLogin.lastUpdatedAt}</h6>
                        <h6>IP: ${currentLogin.ip}</h6>
                    </a>
                </li>`;
    }
  });
  return `${listView}</ul>`;
};
const setCurrentTemplate = function (templateId, data) {
  const container = document.getElementById('pageContainer');
  let template = LoginTemplate;
  if (templateId === 'signupTemplate') {
    template = SignupTemplate;
  }
  if (templateId === 'listTemplate') {
    const listView = createListFromResults(data);
    template = makeListTemplate(listView);
  }
  if (templateId === 'loading') {
    template = '<h6 class="spinning">Loading</h6>';
    container.innerHTML = template;
  }
  container.innerHTML = (template);
};
const showDetails = function (id) {
  const lastResultMap = JSON.parse(StorageService.get(LIST_MAP_TOKEN));
  const userData = lastResultMap[id];
  const currentLogin = userData.top_logins[0];
  const { userAgent } = currentLogin;
  alert(`${currentLogin.user.name}...\n registered since ${currentLogin.user.createdAt}\n${userData.counter} login${userData.counter != 1 ? 's' : ''}\nusing ${userAgent}`);
};

const onLoginClicked = function () {
  const nameInput = document.getElementById('name');
  const passInput = document.getElementById('pass');
  logIn(nameInput.value, passInput.value).then((res) => {
    if (res) {
      setCurrentTemplate('loading');
    }
  });
};
const onSignupClicked = function () {
  const nameInput = document.getElementById('name');
  const passInput = document.getElementById('pass');
  const pass2Input = document.getElementById('pass2');
  if (passInput.value == pass2Input.value) {
    signUp(nameInput.value, passInput.value).then((res) => {
      if (res) {
        alert('signup successful. you can login now');

        setCurrentTemplate('loginTemplate');
      }
    });
  }
};
// GuiService = {
//     setCurrentTemplate,

// }
