import axios from "axios";
import keys from "../config/keys";

const fetchTwitchClips = async sendResponse => {
  const twitchUrl = `https://api.twitch.tv/kraken/clips/top?channel=${
    keys.channel
  }&limit=20`;
  const twitchRes = await axios.get(twitchUrl, {
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": keys.twitchClientID
    }
  });

  return sendResponse({ clips: twitchRes.data.clips });
};

export default fetchTwitchClips;
