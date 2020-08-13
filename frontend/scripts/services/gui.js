const LoginTemplate = `<div id="loginTemplate">
    <h4>
        Name:
    </h4>
    <input id="name" />
    <h4>
        Pass:
    </h4>
    <input id="pass" type="password" />
    <input type="button" value="Login" onClick="onLoginClicked()"></button>
    <input type="button" value="Go to Signup" onClick="setCurrentTemplate('signupTemplate')"></button>
  </div>`;

const SignupTemplate = `<div id="loginTemplate">
<h4>
    Name:
</h4>
<input id="name" />
<h4>
    Pass:
</h4>
<input id="pass" type="password" />
<h4>
    Confirm Pass:
</h4>
<input id="pass2" type="password" />
<input type="button" value="Sign Up" onClick="onSignupClicked()"></button>
<input type="button" value="Go to Login" onClick="setCurrentTemplate('loginTemplate')"></button>
</div>`;
const makeListTemplate = (list) => `<div id="listTemplate">${list}</div>`;

const setMainTitle = function (message) {
  const title = document.getElementById('pageTitle');
  title.innerHTML = message;
};
const setUserBox = function (userData) {
  const titleNotFound = document.getElementById('detailsNotFoundTitle');
  const titleFound = document.getElementById('detailsFoundTitle');
  const detailsFoundArea = document.getElementById('detailsFoundArea');
  if (userData) {
    titleFound.innerHTML = userData.name;
    detailsFoundArea.style.display = 'flex';
    titleNotFound.style.display = 'none';
  } else {
    detailsFoundArea.style.display = 'none';
    titleNotFound.style.display = 'flex';
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
