
var userNotified = false;

var channel = "monsieursapin";
var titleData = "Monsieur Sapin est live !";
var channelLight = "Monsieur Sapin";
var clientId = "You won't get it here ;)";

function callback() {
  var xhr_object = new XMLHttpRequest();
  xhr_object.onreadystatechange = function() {
    if (xhr_object.readyState==4 && xhr_object.status==200){
      var data = JSON.parse(xhr_object.responseText);
      if(data.stream != null ){
        if (userNotified == false) {
          notify(data.stream.channel.status);
          chrome.browserAction.setPopup({popup: "/popup/popuplive.html"});
          toogleStream(true);
        }
      }else if (userNotified){
        chrome.browserAction.setPopup({popup: "/popup/popup.html"});
        toogleStream(false);
      }
    }
  };

  var url = "https://api.twitch.tv/kraken/streams/" + channel + "?client_id=" + clientId;
  xhr_object.open("GET", url, true);
  xhr_object.send();
};

function notify(streamTitle) {
  var notification = new Notification(titleData, {
    icon: '/img/icon_128.png',
    body: streamTitle
  });

  notification.onclick = function () {
    window.open("https://twitch.tv/" + channel);
    notification.close();
  };

  setTimeout(function() {notification.close();}, 10000);
};

function toogleStream(value) {
  userNotified = value;
  if (value == true) {
    chrome.browserAction.setTitle({title : channelLight + " est en live !"});
    chrome.browserAction.setIcon({path:"/img/icon_128.png"});
  }else{
    chrome.browserAction.setTitle({title : channelLight + " est hors ligne"});
    chrome.browserAction.setIcon({path:"/img/icon.png"});
  }
};

setInterval(callback, 30000);
toogleStream(false);
callback();
