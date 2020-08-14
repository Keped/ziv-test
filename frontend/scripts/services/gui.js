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
    <input value="Login" type="button" onClick="onLoginClicked()"></button>
    <input type="button" value="Go to Signup" onClick="setCurrentTemplate('signupTemplate')"></button>
  </form>`;

const SignupTemplate = `<form id="signupTemplate" class="auth-form">
<label for="name">
Name
</label>
<input name="username" id="name"  autocomplete="username"/>
<label for="password">
Pass
</label>
<input id="pass" name="password" type="password" autocomplete="new-password"/>
<label for="password2">
    Confirm Pass:
</label>
<input id="pass2" type="password" name="password2" autocomplete="new-password"/>
<span>
<input type="button" value="Sign Up" onClick="onSignupClicked()"/>
<input type="button" value="Go to Login" onClick="setCurrentTemplate('loginTemplate')"/>
</span>

</form>`;
const makeListTemplate = (list) => `<div id="listTemplate">${list}</div>`;
// this box shows signed in user details when relevant
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

// turn the data to a html list
const createListFromResults = (list) => {
  let listView = '<ul>';
  list.sort((a, b) => a.counter - b.counter).map((userData) => {
    const {
      name,
      userId,
      currentMinutes,
      lastUpdateTime,
      ip,
      lastMinutes
    } = userData;

    listView += `
      <li>
          <a href="#" onClick="showDetails('${userId}')">
              <h4>${name}</h4>
              <h6>Login time minutes (current/last): ${currentMinutes} / ${lastMinutes}</h6>
              <h6>Last update: ${lastUpdateTime.toLocaleString()}</h6>
              <h6>IP: ${ip}</h6>
          </a>
      </li>`;
  });
  return `${listView}</ul>`;
};
// "renderer"
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
// show alert with some user details. data is saved in session storage.
const showDetails = (id) => {
  const lastResultMap = JSON.parse(StorageService.get(LIST_MAP_TOKEN));
  const userData = lastResultMap[id];
  const { userAgent, counter, name, createdAt } = userData;
  alert(`${name}...\n registered since ${createdAt.toLocaleString()}\n${counter} login${counter != 1 ? 's' : ''}\nusing ${userAgent}`);
};
// invoke auth.login to perform action
const onLoginClicked = function () {
  const nameInput = document.getElementById('name');
  const passInput = document.getElementById('pass');
  setCurrentTemplate('loading');
  logIn(nameInput.value, passInput.value).then((res) => {
    //
  }).catch(()=>{
    alert('login failed!');
    setCurrentTemplate('loginTemplate');
  });
};
// basic validations and invoke auth.signup
const onSignupClicked = function () {
  const nameInput = document.getElementById('name');
  const passInput = document.getElementById('pass');
  const pass2Input = document.getElementById('pass2');
  if (passInput.value && passInput.value === pass2Input.value) {
    signUp(nameInput.value, passInput.value).then((res) => {
      if (res && !res.errors) {
        alert('signup successful. you can login now');
        setCurrentTemplate('loginTemplate');
      }
    });
  }
};
// GuiService = {
//     setCurrentTemplate,

// }
