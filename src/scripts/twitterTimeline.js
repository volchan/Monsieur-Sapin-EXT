import axios from "axios";
import keys from "../config/keys";

const fetchTwitterTimeline = async () => {
  const twitterRes = await axios.get(
    `https://twt-fetcher.herokuapp.com/api/v1/timelines/fetch?username=monsieursapin_&limit=50&key=${
      keys.twitterKey
    }`
  );

  const tweets = twitterRes.data.tweets;
  chrome.runtime.sendMessage({ twitterTimeline: tweets });
};

export default fetchTwitterTimeline;
