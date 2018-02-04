let userNotified = false;

const extVersion = "2.2.4";
const channel = "monsieursapin";
const titleLiveData = "Monsieur Sapin est en live !";
const titleVodData = "Monsieur Sapin à lancé une VOD !";
const channelLight = "Monsieur Sapin";
const offlinePopup = "../src/popup.html";
const livePopup = "../src/popup_live.html";
const vodPopup = "../src/popup_vod.html";
const clientId = "You won't get it here !";
const streamUrl = `https://api.twitch.tv/kraken/streams/${channel}?client_id=${clientId}`;

const fetchStreamInfos = async () => {
  const response = await fetch(streamUrl);
  const json = await response.json();
  const stream = json.stream;
  if (stream) {
    checkStreamStatus(stream);
  } else {
    resetNotification();
  }
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
      resetNotification();
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

const resetNotification = () => {
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

  const notification = new Notification(notifTitle, {
    icon: "../src/img/icon_128.png",
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

const checkUpdate = () => {
  checkCookie();
};

const checkCookie = () => {
  chrome.storage.local.get(
    {
      version: ""
    },
    items => {
      if (items.version != extVersion) {
        newCookie();
      }
    }
  );
};

const newCookie = () => {
  chrome.storage.local.set(
    {
      "version": extVersion
    },
    () => {
      const notification = new Notification(`Mise à jour ${extVersion}`, {
        icon: "../src/img/icon_128.png",
        body: "L'extention à bien était mise à jour."
      });

      notification.onclick = () => {
        notification.close();
      };

      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  );
};

checkUpdate();
setInterval(fetchStreamInfos, 5000);
