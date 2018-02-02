
var userNotified = false;

var channel = "monsieursapin";
var titleLiveData = "Monsieur Sapin est en live !";
var titleVodData = "Monsieur Sapin à lancé une VOD !";
var channelLight = "Monsieur Sapin";
var clientId = "You won't find it here :D";

function callback() {
  var xhr_object = new XMLHttpRequest();
  xhr_object.onreadystatechange = function() {
    if (xhr_object.readyState==4 && xhr_object.status==200){
      var data = JSON.parse(xhr_object.responseText);
      if(data.stream != null ){
        if (userNotified == false && data.stream.streamType == 'live') {
          notify(data.stream.channel.status, 'live');
          chrome.browserAction.setPopup({popup: "/popup/popuplive.html"});
          toogleStream('live');
        } else if (userNotified == false && data.stream.streamType == 'watchParty') {
          notify(data.stream.channel.status, 'vod');
          chrome.browserAction.setPopup({popup: "/popup/popupvod.html"});
          toogleStream('vod');
        }
      }else if (userNotified){
        chrome.browserAction.setPopup({popup: "/popup/popup.html"});
        toogleStream('offline');
      }
    }
  };

  var url = "https://api.twitch.tv/kraken/streams/" + channel + "?client_id=" + clientId;
  xhr_object.open("GET", url, true);
  xhr_object.send();
};

function notify(streamTitle, streamType) {
  if (streamType == 'live') {
    title = titleLiveData
  } else {
    title = titleVodData
  }
  var notification = new Notification(title, {
    icon: '/img/icon_128.png',
    body: streamTitle
  });

  notification.onclick = function () {
    window.open("https://twitch.tv/" + channel);
    notification.close();
  };

  setTimeout(function() { notification.close() }, 10000);
};

function toogleStream(value) {
  if (value == 'live') {
    userNotified = true;
    chrome.browserAction.setTitle({title : channelLight + " est en live !"});
    chrome.browserAction.setIcon({path:"/img/live.png"});
  } else if (value == 'vod') {
    userNotified = true;
    chrome.browserAction.setTitle({title : channelLight + " à lancé une VOD !"});
    chrome.browserAction.setIcon({path:"/img/vod.png"});
  } else {
    userNotified = false;
    chrome.browserAction.setTitle({title : channelLight + " est hors ligne"});
    chrome.browserAction.setIcon({path:"/img/icon.png"});
  }
};

setInterval(callback, 30000);
toogleStream(false);
callback();
