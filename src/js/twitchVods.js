import axios from "axios";

export const getTwitchVods = (channel, clientId) => {
  const twitchCards = document.querySelectorAll(".twitch-card");
  const twitchContainer = document.getElementById("twitch");
  const url = `https://api.twitch.tv/kraken/channels/${channel}/videos?broadcasts=true&limit=20&client_id=${clientId};`;
  if (twitchCards.length == 0) {
    fetchVideos(url);
  }
};

const fetchVideos = async url => {
  const res = await axios.get(url);
  console.log(res.data);
};

$('#twitch').append('<div class="twitch-card"><div class="thumbnail" style="background-image: url(' + vods[i].preview.replace(/320x240/, "320x180") + ')"></div><div class="infos"><a href="' + vods[i].url + '" class="vod-link">' + vods[i].title + '</a></div></div>');
