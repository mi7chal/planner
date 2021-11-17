var Workspace = document.getElementById("WorkSpace")
if (getCookie("workSpaceLeft") != "" && getCookie("workSpaceTop") != "") {
  Workspace.style.left = getCookie("workSpaceLeft") + "px";
  Workspace.style.top = getCookie("workSpaceTop") + "px";
}
var toolbox = false; 
toolboxClick();//roboczo
function toolboxClick() {

  var mobileLine1 = document.getElementById("mobileLine1");
  var mobileLine2 = document.getElementById("mobileLine2");
  var mobileLine3 = document.getElementById("mobileLine3");
  var workFrame = document.getElementById("workFrame");

  if (toolbox == false) {
    document.getElementById("toolbox").style.left = 0;
    toolbox = true;

    mobileLine1.style.transform = "rotateZ(405deg)";
    mobileLine1.style.top = "12px";
    mobileLine2.style.opacity = "0";
    mobileLine3.style.transform = "rotateZ(-405deg)";
    mobileLine3.style.top = "-12px";
    //workFrame.style.paddingLeft = "400px";
  }
  else {
    document.getElementById("toolbox").style.left = -400;
    toolbox = false;

    mobileLine1.style.transform = "rotateZ(0deg)";
    mobileLine1.style.top = "0px";
    mobileLine2.style.opacity = "1";
    mobileLine3.style.transform = "rotateZ(0deg)";
    mobileLine3.style.top = "0px";
    // workFrame.style.paddingLeft = "000px";
  }
  delete (mobileLine1);
  delete (mobileLine2);
  delete (mobileLine3);
  delete (workFrame);
}
//zle napisane
var xOld = 0;
var yOld = 0;
var x = 0;
var y = 0;

function sliding() {
  document.addEventListener('mousemove', onMouseUpdate);
  xOld = event.pageX;
  yOld = event.pageY;
  document.addEventListener('mouseup', onMouseUp, false);
}



function onMouseUpdate(event) {
  x = event.pageX;

  y = event.pageY;
  var top = Workspace.style.top;
  var left = Workspace.style.left;

  console.log(left + "  " + top)
  top = Number(top.substr(0, top.length - 2));
  left = Number(left.substr(0, left.length - 2));
  varTop = top + (y - yOld);
  varLeft = left + (x - xOld);
  setCookie("workSpaceLeft", varLeft, 1);
  setCookie("workSpaceTop", varTop, 1);
  Workspace.style.top = varTop + "px";
  Workspace.style.left = varLeft + "px";
  xOld = x;
  yOld = y;

}
function onMouseUp(e) {
  mouseUp = true;
  document.removeEventListener('mousemove', onMouseUpdate);
  document.removeEventListener('mouseup', onMouseUp, false);

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
var zoom = getCookie("zoom");

if (zoom == "") {
  zoom = 1;
}
document.getElementById("WorkSpace").style.transform = "scale(" + zoom + ")";
console.log(zoom);
function zoomIn() {

  zoom = Math.round(zoom * 10 + 1) / 10;
  setCookie("zoom", zoom, 1);
  document.getElementById("WorkSpace").style.transform = "scale(" + zoom + ")";
}

function zoomOut() {
  zoom = Math.round(zoom * 10 - 1) / 10;
  setCookie("zoom", zoom, 1);
  document.getElementById("WorkSpace").style.transform = "scale(" + zoom + ")";
}


  // CUSTOM MENU
  // if (document.addEventListener) {
  //   document.addEventListener('contextmenu', function(e) {
  //     alert("You've tried to open context menu");
  //     e.preventDefault();
  //   }, false);
  // } else {
  //   document.attachEvent('oncontextmenu', function() {
  //     alert("You've tried to open context menu");
  //     window.event.returnValue = false;
  //   });
  // }