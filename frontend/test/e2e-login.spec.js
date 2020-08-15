const TemplatesMaker = require('../scripts/templates');
const StorageServiceMaker = require('../scripts/services/store');
const AuthControlMaker = require('../scripts/controllers/auth');
const GuiServiceMaker = require('../scripts/services/gui');
const Templates = TemplatesMaker();
// console.log(Object.keys(storageServiceMaker).toString());
describe('Login e2e', () => {
  const htmlBody = `<body class="elementor-test">
     <!-- these two have to be absolute -->

     <div class="user-details" id="detailsBox">
          <h5 id="detailsFoundArea">
              <span id="detailsFoundTitle"></span>
              <br/>
              <a href="#" onClick="App.AuthControl.logOut()">Disconnect</a>
          </h5>
     </div> 
     <div id="pageContainer">${Templates.loginTemplate}</div>
     <script type="text/javascript" src="../scripts/templates.js" ></script>
     <script type="text/javascript" src="../scripts/constants.js" ></script>
     <script type="text/javascript" src="../scripts/services/api.js" /></script>
     <script type="text/javascript" src="../scripts/services/store.js" /></script>
     <script type="text/javascript" src="../scripts/services/gui.js" /></script>
     <script type="text/javascript" src="../scripts/controllers/auth.js" /></script>
     <script type="text/javascript" src="../scripts/controllers/main.js" /></script>
  </body>`;

  const App = {
    GuiService: null, // these two are co-dependent and made by constructors
    AuthControl: null,
    Templates,
    //   ApiService,
    StorageService: StorageServiceMaker(),
  };

  test('form renders', async () =>  {
  const App = jest.mock('../scripts/controllers/main');

    // without making a copy you will have a circular dependency problem
    const originalWindow = { ...window };
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow, // in case you need other window properties to be in place
      App
    }));
    document.head.innerHTML = htmlHead;
    document.body.innerHTML = htmlBody; //  `<div id="pageContainer">${loginTemplate}</div>`;
    
    const page = document.getElementById('loginTemplate');
    const login = document.getElementById('loginTemplate');
    expect(login !== null);

    // await gotoSignup.dispatchEvent(new Event('click'));
    // const form2 = document.getElementById('signupTemplate');
    // expect(form);
  });
});
