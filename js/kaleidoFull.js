


/* Setup variables
------------------------------ */

var app = document.getElementsByTagName("BODY")[0];
var baseUrl = "https://henryegloff.com/kaleidotext";
var textInput = document.getElementById("textinput");
var slider = document.getElementById("slider");
var appLink = document.getElementById("applink");
var message = "edit this...";
var size = 400;
var appLinkString = "";
var mode = "light";




/* Initalise
------------------------------ */

function init() {
    
    // Get query string parameters
    
    function getQueryStringParam(param) {
        var url = window.location.toString();
        url.match(/\?(.+)$/);
        var params = RegExp.$1;
        params = params.split("&");
        var queryStringList = {};
        for (var i = 0; i < params.length; i++) {
            var tmp = params[i].split("=");
            queryStringList[tmp[0]] = unescape(tmp[1]);
        }
        return queryStringList[param];
    }
    
    // Apply query string parameters if they exist
    
    if (getQueryStringParam("message")) {
        var customMessage = getQueryStringParam("message");
        var customMode = getQueryStringParam("mode");
        var customSize = getQueryStringParam("size");
        var x = document.getElementsByClassName("animation");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].textContent = customMessage;
            x[i].style.fontSize = customSize + "px"; 
        }
        appLinkString = baseUrl + "?message=" + customMessage +"&size=" + customSize +"&mode=" + customMode;
        appLink.textContent = appLinkString;
        appLink.href = appLinkString;
        slider.value = customSize; 
        textInput.placeholder = customMessage;
        if (customMode == "dark") {
            app.classList.add("dark");
        }
        mode = customMode;
        app.setAttribute("control-state", "none");
    }
    
    // Otherwise set default values
    
    else {
        var x = document.getElementsByClassName("animation");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].textContent = message;
            x[i].style.fontSize = size + "px";
        }
        appLinkString = baseUrl + "?message=" + message +"&size=" + size +"&mode=" + mode;
        appLink.textContent = appLinkString;
        appLink.href = appLinkString;
        slider.value = size;
        textInput.placeholder = message;   
        app.setAttribute("control-state", "none");
        //app.setAttribute("control-state", "edit");
    }

}

init();


/* Update Text
------------------------------ */

function updateText() {
    message = document.getElementById("textinput").value;
    var x = document.getElementsByClassName("animation");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].textContent = message;
    }
    appLinkString = baseUrl + "?message=" + message +"&size=" + size+"&mode=" + mode;
    appLink.textContent = appLinkString;
    appLink.href = appLinkString;
}



/* Update Size
------------------------------ */

slider.oninput = function() {
    size = this.value;
    var x = document.getElementsByClassName("animation");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.fontSize = size + "px";
    }
    appLinkString = baseUrl + "?message=" + message +"&size=" + this.value +"&mode=" + mode;
    appLink.textContent = appLinkString;
};



/* Edit Controls
------------------------------ */

function close_overlay() {
    app.setAttribute("control-state", "none");
}

function edit() {
    app.setAttribute("control-state", "edit");
}




/* Copy URL
------------------------------ */

function copyFunction() {
    var linkHolder = document.createElement("input");
    document.body.appendChild(linkHolder);
    linkHolder.setAttribute("id", "linkHolder_id");
    document.getElementById("linkHolder_id").value = appLinkString;
    linkHolder.select();
    document.execCommand("copy");
    document.body.removeChild(linkHolder);
    //alert("Copied to clipboard: " + appLinkString);

 
    var toast = document.getElementById("toast");

  // Add the "show" class to DIV
  toast.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 2500);
    
}



/* Keyboard User
------------------------------ */

function handleFirstTab(e) {
    if (e.keyCode === 9) {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
    }
}

window.addEventListener("keydown", handleFirstTab);



function dark_toggle() {
	app.classList.toggle("dark");
    if (mode == "light") {
        mode = "dark";
    } else {    
        mode = "light";
    }
    appLinkString = baseUrl + "?message=" + message +"&size=" + size +"&mode=" + mode;
    appLink.textContent = appLinkString;
}



function toggleFullscreen(elem) {
    var elem = document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


