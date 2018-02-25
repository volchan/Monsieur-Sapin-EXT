import axios from "axios";
import keys from "../config/keys";

const fetchTwitchClips = async () => {
  const twitchUrl = `https://api.twitch.tv/kraken/clips/top?channel=${
    keys.channel
  }&limit=20`;
  const twitchRes = await axios.get(twitchUrl, {
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": keys.twitchClientID
    }
  });

  const clips = twitchRes.data.clips;
  chrome.runtime.sendMessage({ twitchClips: clips });
};

export default fetchTwitchClips;
