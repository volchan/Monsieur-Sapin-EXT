require("babel-core/register");
require("babel-polyfill");

let notified = false;

const extVersion = "2.2.9";
const channel = "monsieursapin";
const titleLiveData = "Monsieur Sapin est en live !";
const titleVodData = "Monsieur Sapin à lancé une VOD !";
const channelLight = "Monsieur Sapin";
const offlinePopup = "../src/popup.html";
const livePopup = "../src/popup_live.html";
const vodPopup = "../src/popup_vod.html";
const clientId = "not here :D";
const streamUrl = `https://api.twitch.tv/kraken/streams/${channel}?client_id=${clientId}`;

const fetchStreamInfos = async () => {
  const response = await fetch(streamUrl);
  const json = await response.json();
  const stream = json.stream;
  console.log("twitch response:",stream);
  if (stream) {
    checkStreamStatus(stream);
  } else {
    resetNotification();
  }
};

const checkStreamStatus = stream => {
  console.log("checkStreamStatus");
  const status = stream.stream_type;

  chrome.storage.local.get(
    {
      notified: ""
    },
    items => {
      notified = items.notified;
      console.log("items", items);
      console.log("notified :", notified);
      console.log("status : ", status);

      switch (status) {
        case "live":
          if (notified == false) {
            notifyLive(stream);
          }
          break;
        case "watchParty":
          if (notified == false) {
            notifyVod(stream);
          }
          break;
        case null:
          resetNotification();
          break;
      }
    }
  );
};

const notifyLive = stream => {
  chrome.browserAction.setTitle({ title: titleLiveData });
  chrome.browserAction.setIcon({ path: "../src/img/icon_128.png" });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#6f9e5a" });
  chrome.browserAction.setBadgeText({ text: "LIVE" });
  chrome.browserAction.setPopup({ popup: livePopup });
  notify(stream.stream_type, stream);
};

const notifyVod = stream => {
  chrome.browserAction.setTitle({ title: titleVodData });
  chrome.browserAction.setIcon({ path: "../src/img/icon_128.png" });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#6f9e5a" });
  chrome.browserAction.setBadgeText({ text: "VOD" });
  chrome.browserAction.setPopup({ popup: vodPopup });
  notify(stream.stream_type, stream);
};

const resetNotification = () => {
  console.log("resetNotification!!!!");
  chrome.storage.local.set(
    {
      notified: false
    },
    () => {
      chrome.browserAction.setTitle({
        title: channelLight + " est hors ligne"
      });
      chrome.browserAction.setIcon({ path: "../src/img/icon.png" });
      chrome.browserAction.setBadgeText({ text: "" });
      chrome.browserAction.setPopup({ popup: offlinePopup });
    }
  );
};

const notify = (streamType, stream) => {
  chrome.storage.local.set(
    {
      notified: true
    },
    () => {
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
      console.log("notification :", notification);

      notification.onclick = () => {
        window.open("https://twitch.tv/" + channel);
        notification.close();
      };

      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  );
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
      version: extVersion
    },
    () => {
      const notification = new Notification(`Mise à jour ${extVersion}`, {
        icon: "../src/img/icon_128.png",
        body: "L'extension à bien été mise à jour."
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
setInterval(fetchStreamInfos, 15000);
