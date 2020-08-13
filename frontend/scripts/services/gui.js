
var LoginTemplate = `<div id="loginTemplate">
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
  
var SignupTemplate = `<div id="loginTemplate">
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
var makeListTemplate = (list)=>{return `<div id="listTemplate">${list}</div>`};

var setMainTitle = function(message){
    const title = document.getElementById("pageTitle");
    title.innerHTML= message;
}
var setUserBox = function(userData){
    const titleNotFound = document.getElementById('detailsNotFoundTitle');
    const titleFound = document.getElementById('detailsFoundTitle');
    const detailsFoundArea = document.getElementById('detailsFoundArea');
    if(userData){
        titleFound.innerHTML = userData.name;
        detailsFoundArea.style.display = 'flex';
        titleNotFound.style.display = 'none';
    }else{
        detailsFoundArea.style.display= 'none';
        titleNotFound.style.display= 'flex';
    }
}
var setCurrentTemplate = function(templateId, data){
    const container = document.getElementById("pageContainer");
    let template = LoginTemplate;
    if(templateId == 'signupTemplate'){
        template = SignupTemplate;
    }
    if(templateId == 'listTemplate'){
        const listView = createListFromResults(data) 
        template = makeListTemplate(listView);
    }
    container.innerHTML= template;
}
var showDetails = function (id){
    const lastResultMap = JSON.parse(StorageService.get(LIST_MAP_TOKEN));
    const userData = lastResultMap[id];
    const currentLogin = userData.top_logins[0];
    const userAgent = currentLogin.userAgent;
    alert(`${currentLogin.user.name}...\n registered since ${currentLogin.user.createdAt}\n${userData.counter} login${userData.counter != 1 ? 's':''}\nusing ${userAgent}`)
}
var createListFromResults = function (resultList){
    let listView = '<ul>';
    resultList.map((userData)=>{
        
        const topLogIns = userData.top_logins;
        const currentLogin = topLogIns[0];
        const lastLogin = topLogIns[1];
        let diffTime = Math.abs(new Date()-new Date(currentLogin.createdAt));
        diffTime = Math.ceil(diffTime / (1000*60));
        if(topLogIns[0].active){
            listView+= `
                <li>
                    <a href="#" onClick="showDetails('${currentLogin.user._id}')">
                        <h3>${currentLogin.user.name}</h3>
                        <h5>Login time: ${diffTime} minute${diffTime > 1? 's' :''}</h5>
                        <h5>Last update: ${currentLogin.lastUpdated}</h5>
                        <h5>Last login time: ${lastLogin? lastLogin.createdAt:'N/A'}</h5>
                        <h5>IP: ${currentLogin.ip}</h5>
                    </a>
                    
                </li>`;

        }
        
    })
    return listView+"</ul>";
}

var onLoginClicked = function(){
    const nameInput = document.getElementById('name');
    const passInput = document.getElementById('pass');
    logIn(nameInput.value,passInput.value).then((res)=>{

    });
}
var onSignupClicked = function(){
    const nameInput = document.getElementById('name');
    const passInput = document.getElementById('pass');
    const pass2Input = document.getElementById('pass2');
    if (passInput.value == pass2Input.value){
        signUp(nameInput.value,passInput.value).then((res)=>{
            if(res){
            alert('signup successful. you can login now');

                setCurrentTemplate('loginTemplate')
            }
        });
    }

}