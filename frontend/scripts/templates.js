const TemplatesMaker = () => ({
  loading: '<h6 class="spinning">Loading</h6>',
  modalTemplate: (type, title, text)=> (`
    <div id="modal-body" class="alert-${type}">
        <h4>${title}</h4>
        <p>${text}</p>
        <input type="button" value="OK" onclick="App.GuiService.toggleModal()"/> 
    </div>
  `),  
  loginTemplate: `<form id="loginTemplate" class="auth-form">
    <label for="name">
        Name
    </label>
    <input name="username" id="name"  autocomplete="username"/>
    <label for="password">
        Pass
    </label>
    <input name="password" id="pass" type="password" autocomplete="current-password"/>
    <span>
    <input id="login-btn" value="Login" type="button" onClick="App.GuiService.onLoginClicked()"/>
    <input id="goto1" type="button" value="Go to Signup" onClick="App.GuiService.setCurrentTemplate('signupTemplate')"/>
  </form>`,
  signupTemplate: `<form id="signupTemplate" class="auth-form">
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
    <input id="signup-btn" type="button" value="Sign Up" onClick="App.GuiService.onSignupClicked()"/>
    <input id="goto-login-btn" type="button" value="Go to Login" onClick="App.GuiService.setCurrentTemplate('loginTemplate')"/>
    </span>
    </form>`,
});
if (typeof module === 'undefined') {
  window.TemplatesMaker = TemplatesMaker;
} else {
  module.exports = TemplatesMaker;
}