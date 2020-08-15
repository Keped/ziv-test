// the gui service deals with rendering App.templates and suplying callbacks for them
// moved inside a factory function for minimal (yet explicit) reliance on global scope
// All DOM manipulation happens here (except setting listener for "DOMReady")
const GuiServiceMaker = (App) => {
  const { LIST_MAP_TOKEN } = App.StorageService;
  const service = {
    // generic replacement of 'alert'
    toggleModal(template) {
      let newHeight = '100%';
      if (!template) {
        newHeight = '0%';
        template = '<div></div>';
      }
      const modalContainer = document.getElementById('modal-container');
      const opaque = document.getElementById('modal-background');
      modalContainer.innerHTML = template;
      opaque.style.height = newHeight;
      modalContainer.style.height = newHeight;
    },
    showModal(type,title,text) {
      this.toggleModal(App.Templates.modalTemplate(type,title,text));
    },
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
              <a href="#" onClick="App.GuiService.showDetails('${userId}')">
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
    // main "render method", gets a flag and data if necessary from controller
    setCurrentTemplate(templateId, data) {
      const container = document.getElementById('pageContainer');
      let template = App.Templates.loginTemplate;
      if (templateId === 'signupTemplate') {
        template = App.Templates.signupTemplate;
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
        App.AuthControl.signUp(nameInput.value, passInput.value).then(()=>{});//(res) => {
        // if (res && !res.errors) {
        //   alert('signup successful. you can login now');
        //   this.setCurrentTemplate('loginTemplate');
        // }
      //   });
      }
    },
    // invoke auth.login to perform action
    onLoginClicked() {
      const self = this;
      const nameInput = document.getElementById('name');
      const passInput = document.getElementById('pass');
      this.setCurrentTemplate('loading');
      App.AuthControl.logIn(nameInput.value, passInput.value).then(()=>{});
    },
    // get details for modal from storage and invoke GUI method
    showDetails(id) {
      const lastResultMap = JSON.parse(App.StorageService.get(LIST_MAP_TOKEN));
      const userData = lastResultMap[id];
      const { userAgent, counter, name, createdAt } = userData;
      const text = `username is ${name}.<br/> registered since ${createdAt.toLocaleString()}<br/>
      ${counter} login${counter != 1 ? 's' : ''}<br/>using ${userAgent}`;
      this.showModal('info', 'User Details', text);
    },
  };
  return {
    setCurrentTemplate: service.setCurrentTemplate.bind(service),
    createListFromResults: service.createListFromResults.bind(service),
    onLoginClicked: service.onLoginClicked.bind(service),
    setUserBox: service.setUserBox.bind(service),
    onSignupClicked: service.onSignupClicked.bind(service),
    showModal: service.showModal.bind(service),
    toggleModal: service.toggleModal.bind(service),
    showDetails: service.showDetails.bind(service),
  };
};
if (typeof module === 'undefined') {
  window.GuiServiceMaker = GuiServiceMaker;
} else {
  module.exports = GuiServiceMaker;
}
