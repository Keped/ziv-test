const TemplatesMaker = require('../scripts/templates');
const GuiServiceMaker = require('../scripts/services/gui');
const Templates = TemplatesMaker();

describe('Renderer + templates integration', () => {
  const htmlBody = `<body class="elementor-test">
     <!-- these two have to be absolute -->
     <div class="smother-all" id="modal-background"></div>
     <div class="smother-all" id="modal-container"></div>
     <div class="user-details" id="detailsBox">
          <h5 id="detailsFoundArea">
              <span id="detailsFoundTitle"></span>
              <br/>
              <a href="#" onClick="App.AuthControl.logOut()">Disconnect</a>
          </h5>
     </div> 
     <div id="pageContainer">${Templates.loginTemplate}</div>
  </body>`;
  const htmlHead = `<link rel="stylesheet" type="text/css" href="./style/general.css">`;
  const App = {
    AuthControl: { logIn: jest.fn() },
    Templates,
    StorageService: { LIST_MAP_TOKEN: 'test-token' },
  };
  const gui = GuiServiceMaker(App);
  test('render function', async () => {
    // JSDOM document
    document.head.innerHTML = htmlHead;
    document.body.innerHTML = htmlBody;
    const page = document.getElementById('pageContainer');
    gui.setCurrentTemplate('loginTemplate');
    const login = document.getElementById('loginTemplate');
    expect(login !== null);
    gui.setCurrentTemplate('loading');
    expect(page.innerHTML).toEqual(Templates.loading);
  });
});
