// moved inside a factory function for minimal (yet explicit) reliance on global scope
const GuiServiceMaker = () => {
  const service = {
    // the list comes ready from controller and server so just render
    createListFromResults(list) {
      let listView = '<ul>';
      list.sort((a, b) => a.counter - b.counter).map((userData) => {
        const {
          name,
          userId,
          currentMinutes,
          lastUpdateTime,
          ip,
          lastMinutes,
        } = userData;
        listView += `
          <li>
              <a href="#" onClick="GuiService.showDetails('${userId}')">
                  <h4>${name}</h4>
                  <h6>Login time minutes (current/last): ${currentMinutes} / ${lastMinutes}</h6>
                  <h6>Last update: ${lastUpdateTime.toLocaleString()}</h6>
                  <h6>IP: ${ip}</h6>
              </a>
          </li>`;
      });
      // ended making list
      return `${listView}</ul>`;
    },
    // main "render method"
    setCurrentTemplate(templateId, data) {
      const container = document.getElementById('pageContainer');
      let template = Templates.loginTemplate;
      if (templateId === 'signupTemplate') {
        template = Templates.signupTemplate;
      }
      if (templateId === 'listTemplate') {
        const listView = this.createListFromResults(data);
        template = `<div id="listTemplate">${listView}</div>`;
      }
      if (templateId === 'loading') {
        template = '<h6 class="spinning">Loading</h6>';
        container.innerHTML = template;
      }
      container.innerHTML = (template);
    },
    // this box shows signed in user details when relevant
    setUserBox(userData) {
      const titleFound = document.getElementById('detailsFoundTitle');
      const detailsFoundArea = document.getElementById('detailsFoundArea');
      if (userData) {
        titleFound.innerHTML = userData.name;
        detailsFoundArea.style.visibility = 'visible';
      } else {
        detailsFoundArea.style.visibility = 'hidden';
      }
    },
    // basic validations and invoke auth.signup
    onSignupClicked() {
      const nameInput = document.getElementById('name');
      const passInput = document.getElementById('pass');
      const pass2Input = document.getElementById('pass2');
      if (passInput.value && passInput.value === pass2Input.value) {
        signUp(nameInput.value, passInput.value).then((res) => {
          if (res && !res.errors) {
            alert('signup successful. you can login now');
            this.setCurrentTemplate('loginTemplate');
          }
        });
      }
    },
    // invoke auth.login to perform action
    onLoginClicked() {
      const self = this;
      const nameInput = document.getElementById('name');
      const passInput = document.getElementById('pass');
      this.setCurrentTemplate('loading');
      AuthControl.logIn(nameInput.value, passInput.value).then((res) => {
        //
      }).catch(()=>{
        alert('login failed!');
        self.setCurrentTemplate('loginTemplate');
      });
    },
  }
  return {
    setCurrentTemplate: service.setCurrentTemplate.bind(service),
    createListFromResults: service.createListFromResults.bind(service),
    onLoginClicked: service.onLoginClicked.bind(service),
    setUserBox: service.setUserBox.bind(service),
    onSignupClicked: service.onSignupClicked.bind(service),
  };
};
window.GuiService = GuiServiceMaker();