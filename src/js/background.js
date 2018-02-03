let userNotified = false;

const channel = "monsieursapin";
const titleLiveData = "Monsieur Sapin est en live !";
const titleVodData = "Monsieur Sapin à lancé une VOD !";
const channelLight = "Monsieur Sapin";
const offlinePopup = "/src/popup/popup.html";
const livePopup = "/src/popup/popup_live.html";
const vodPopup = "/src/popup/popup_vod.html";
const clientId = "You won't find it here :D";
const streamUrl = `https://api.twitch.tv/kraken/streams/${channel}?client_id=${clientId}`;

const fetchStreamInfos = async () => {
  const response = await fetch(streamUrl);
  const json = await response.json();
  const stream = json.stream;
  checkStreamStatus(stream);
};

const checkStreamStatus = stream => {
  const status = stream.stream_type;
  switch (status) {
    case "live":
      if (!userNotified) {
        notifyLive(stream);
      }
      break;
    case "watchParty":
      if (!userNotified) {
        notifyVod(stream);
      }
      break;
    default:
      resetNotification(stream);
  }
};

const notifyLive = stream => {
  chrome.browserAction.setTitle({ title: titleLiveData });
  chrome.browserAction.setIcon({ path: "../src/img/live_128.png" });
  chrome.browserAction.setPopup({ popup: livePopup });
  notify(stream.stream_type, stream);
};

const notifyVod = stream => {
  chrome.browserAction.setTitle({ title: titleVodData });
  chrome.browserAction.setIcon({ path: "../src/img/vod_128.png" });
  chrome.browserAction.setPopup({ popup: vodPopup });
  notify(stream.stream_type, stream);
};

const resetNotification = stream => {
  userNotified = false;
  chrome.browserAction.setTitle({ title: channelLight + " est hors ligne" });
  chrome.browserAction.setIcon({ path: "../src/img/icon.png" });
  chrome.browserAction.setPopup({ popup: offlinePopup });
};

const notify = (streamType, stream) => {
  const streamTitle = stream.channel.status;
  let notifTitle = "";

  switch (streamType) {
    case "live":
      notifTitle = titleLiveData;
      break;
    case "vod":
      notifTitle = titleVodData;
      break;
    default:
      notifTitle;
  }

  const notification = new Notification(streamTitle, {
    icon: "/src/img/icon_128.png",
    body: streamTitle
  });

  userNotified = true;

  notification.onclick = () => {
    window.open("https://twitch.tv/" + channel);
    notification.close();
  };

  setTimeout(() => {
    notification.close();
  }, 5000);
};

setInterval(fetchStreamInfos, 5000);
