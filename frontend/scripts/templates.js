const Templates = {
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
    <input value="Login" type="button" onClick="GuiService.onLoginClicked()"></button>
    <input type="button" value="Go to Signup" onClick="GuiService.setCurrentTemplate('signupTemplate')"></button>
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
    <input type="button" value="Sign Up" onClick="GuiService.onSignupClicked()"/>
    <input type="button" value="Go to Login" onClick="GuiService.setCurrentTemplate('loginTemplate')"/>
    </span>
    </form>`,
};