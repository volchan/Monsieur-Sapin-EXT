import axios from "axios";
import newNotification from "./scripts/notification";
import checkUpdate from "./scripts/update";
import fetchTwitchClips from "./scripts/twitchClips";
import fetchYoutubeVideos from "./scripts/youtubeVideos";
import fetchTwitterTimeline from "./scripts/twitterTimeline";

const keys = require("./config/keys");

let notified = false;
let created_at = null;

const channel = keys.channel;
const titleLiveData = "Monsieur Sapin est en live !";
const titleVodData = "Monsieur Sapin à lancé une VOD !";
const channelLight = "Monsieur Sapin";
const clientId = keys.twitchClientID;
const streamUrl = `https://api.twitch.tv/kraken/streams/${channel}?client_id=${clientId}`;

const fetchStreamInfos = async () => {
  const res = await axios.get(streamUrl);
  const stream = res.data.stream;
  console.log("twitch response:", stream);
  sendStreamToReact(stream);
  if (stream) {
    checkStreamStatus(stream);
  } else {
    resetNotification();
  }
};

const sendStreamToReact = stream => {
  chrome.runtime.sendMessage({ stream: stream });
};

const checkStreamStatus = stream => {
  console.log("checkStreamStatus");
  const status = stream.stream_type;

  chrome.storage.local.get(
    {
      notified: "",
      created_at: ""
    },
    items => {
      notified = items.notified;
      created_at = items.created_at;
      console.log("items", items);
      console.log("status : ", status);

      switch (status) {
        case "live":
          notifyLive(stream);
          break;
        case "watchParty":
          notifyVod(stream);
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
  chrome.browserAction.setIcon({ path: "./assets/icon_live.png" });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#6f9e5a" });
  chrome.browserAction.setBadgeText({ text: "LIVE" });
  if (notified == false && created_at != stream.created_at) {
    notify(stream.stream_type, stream);
  }
};

const notifyVod = stream => {
  chrome.browserAction.setTitle({ title: titleVodData });
  chrome.browserAction.setIcon({ path: "./assets/icon_live.png" });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#6f9e5a" });
  chrome.browserAction.setBadgeText({ text: "VOD" });
  if (notified == false && created_at != stream.created_at) {
    notify(stream.stream_type, stream);
  }
};

const resetNotification = () => {
  console.log("resetNotification!!!!");
  chrome.storage.local.set(
    {
      notified: false,
      stream: null
    },
    () => {
      chrome.browserAction.setTitle({
        title: channelLight + " est hors ligne"
      });
      chrome.browserAction.setIcon({ path: "./assets/icon.png" });
      chrome.browserAction.setBadgeText({ text: "" });
    }
  );
};

const notify = (streamType, stream) => {
  chrome.storage.local.set(
    {
      notified: true,
      created_at: stream.created_at,
      stream: stream
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

      newNotification(notifTitle, streamTitle);
    }
  );
};

checkUpdate();
const live = setInterval(() => {
  fetchStreamInfos();
}, 5000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from == "twitch") {
    fetchTwitchClips(sendResponse);
    return true;
  } else if (request.from == "youtube") {
    fetchYoutubeVideos(sendResponse);
    return true;
  }
});

// const twitter = setInterval(()=>{
//   fetchTwitterTimeline()
// }, 5000);
// chrome.alarms.create("live", { when: Date.now() + 1000, periodInMinutes: 0.1 });
// chrome.alarms.create("twitch", { when: Date.now() + 1000, periodInMinutes: 0.1 });
// chrome.alarms.create("youtube", { when: Date.now() + 1000, periodInMinutes: 0.1 });
// chrome.alarms.create("twitter", { when: Date.now() + 1000, periodInMinutes: 5 });
// chrome.alarms.onAlarm.addListener(alarm => {
//   switch (alarm.name) {
//     case "live":
//       fetchStreamInfos();
//       break;
//     case "twitch":
//       fetchTwitchClips();
//       break;
//     case "youtube":
//       fetchYoutubeVideos();
//       break;
//     case "twitter":
//       fetchTwitterTimeline();
//       break;
//   }
// });
