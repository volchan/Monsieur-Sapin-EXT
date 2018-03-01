import axios from "axios";
import keys from "../config/keys";

const fetchYoutubeVideos = async sendResponse => {
  const params = `?part=snippet&maxResults=25&order=date&type=video&channelId=${
    keys.ytChannelID
  }&key=${keys.ytClientID}`;
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search${params}`;
  const youtubeRes = await axios.get(youtubeUrl);
  console.log(youtubeRes);

  return sendResponse({ vods: youtubeRes.data.items });
};

export default fetchYoutubeVideos;
