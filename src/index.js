require("babel-core/register");
require("babel-polyfill");

const channel = "monsieursapin";
const twitchClientId = "not here :D";
const youtubeClientId = "not here :D";

const tabHandler = () => {
  const tabLinks = document.querySelectorAll(".tab-link");
  tabLinks.forEach(tabLink => {
    tabLink.addEventListener("click", ({ target }) => {
      const tabId = target.dataset.tab;
      const activeTab = document.getElementsByClassName("tab-link active")[0];

      const tabContent = document.getElementById(tabId);
      const activeTabContent = document.getElementsByClassName(
        "tab-content active"
      )[0];

      const btn = document.getElementById(`${tabId}-btn`);
      const activeBtn = document.getElementsByClassName("btn active")[0];
      const twitchBtn = document.getElementById("twitch-btn");

      activeTab.classList.remove("active");
      target.classList.add("active");

      if (btn != null) {
        activeBtn.classList.remove("active");
        btn.classList.add("active");
      } else {
        activeBtn.classList.remove("active");
        twitchBtn.classList.add("active");
      }
      activeTabContent.classList.remove("active");
      tabContent.classList.add("active");
    });
  });
};

const getTwitchClips = (channel, clientId) => {
  const url = `https://api.twitch.tv/kraken/clips/top?channel=${channel}&limit=20`;
  fetchClips(url, clientId);
};

const fetchClips = async (url, clientId) => {
  const twitchHeaders = new Headers({
    Accept: "application/vnd.twitchtv.v5+json",
    "Client-ID": clientId
  });

  const twitchOptions = {
    method: "GET",
    headers: twitchHeaders,
    mode: "cors",
    cache: "default"
  };

  const response = await fetch(url, twitchOptions);
  const json = await response.json();
  const clips = json.clips;
  displayClips(clips);
};

const displayClips = clips => {
  const twitchContainer = document.getElementById("twitch");
  const renderedClips = clips.map(clip => renderClip(clip));
  twitchContainer.innerHTML = renderedClips.join("");
};

const renderClip = clip => {
  return `
  <div class="card" style="background-image: url(${clip.thumbnails.medium})">
    <div class="card-infos">
      <div class="card-infos-game-title">
        <div class="card-infos-title">
          <p class="title">${renderTitle(clip.title, 25)}</p>
          <p class="date">${new Date(clip.created_at).toLocaleDateString(
            "fr-FR"
          )}</p>
          <p class="game">${clip.game}</p>
        </div>
      </div>
      <div class="card-infos-author">
        <div class="author-avatar" style="background-image: url(${
          clip.curator.logo
        })"></div>
        <div class="author-name">${clip.curator.display_name}</div>
      </div>
    </div>
    <a href=${clip.url}></a>
  </div>
  `;
};

const renderTitle = (title, length) => {
  if (title.length >= length) {
    return `${title.substring(0, length)}...`;
  } else {
    return title;
  }
};

const getYoutubeVideos = youtubeClientId => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=date&type=video&channelId=UCAbbMVRJ9zL5InVafR0vZJQ&key=${youtubeClientId}`;
  fetchVideos(url);
};

const fetchVideos = async url => {
  const response = await fetch(url);
  const json = await response.json();
  const videos = json.items;
  displayVideos(videos);
};

const displayVideos = videos => {
  const youtubeContainer = document.getElementById("youtube");
  const renderedVideos = videos.map(video => renderVideo(video));
  youtubeContainer.innerHTML = renderedVideos.join("");
};

const renderVideo = video => {
  return `
    <div class="card youtube" style="background-image: url('${
      video.snippet.thumbnails.high.url
    }')">
      <div class="card-infos youtube">
        <p class="date">${new Date(
          video.snippet.publishedAt
        ).toLocaleDateString("fr-FR")}</p>
        <p class="title">${renderTitle(video.snippet.title, 50)}</p>
      </div>
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}"></a>
    </div>
  `;
};

const playAudio = () => {
  const audio = document.querySelector("audio");
  audio.volume = 0.5;
  audio.play();
};

document.addEventListener("DOMContentLoaded", () => {
  tabHandler();

  getTwitchClips(channel, twitchClientId);
  getYoutubeVideos(youtubeClientId);

  window.addEventListener("click", event => {
    if (event.target.href !== undefined) {
      chrome.tabs.create({ url: event.target.href });
    }
  });

  document.getElementById("fretille").addEventListener("click", () => {
    playAudio();
  });
});
