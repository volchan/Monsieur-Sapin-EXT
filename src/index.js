const channel = "monsieursapin";
const clientId = "g7dc2o9buaa6xrmiu846ghjz8c92jm";
const twitchCards = document.querySelectorAll(".twitch-card");
const twitchContainer = document.getElementById("twitch");
const url = `https://api.twitch.tv/kraken/clips/top?channel=${channel}&limit=20`;

const twitchHeaders = new Headers({
  "Accept": "application/vnd.twitchtv.v5+json",
  "Client-ID": clientId,
  "X-Custom-Header": "ProcessThisImmediately"
});
const twitchOptions = {
  method: "GET",
  headers: twitchHeaders,
  mode: "cors",
  cache: "default"
};

const getTwitchClips = (channel, clientId) => {
  fetchClips(url);
};

const fetchClips = async url => {
  const response = await fetch(url, twitchOptions);
  const json = await response.json();
  const clips = json.clips;
  console.log(clips);
  displayClips(clips);
};

const displayClips = clips => {
  const renderedVideos = clips.map(clip => renderClip(clip));
  twitchContainer.innerHTML = renderedVideos.join("");
};

const renderClip = clip => {
  return `
  <div class="twitch-card" style="background-image: url(${clip.thumbnails.medium})">
    <div class="twitch-card-infos">
      <div class="twitch-card-infos-game-title">
        <div class="twitch-card-infos-title">
          <p class="title">${renderTitle(clip.title)}</p>
          <p class="date">${new Date(clip.created_at).toLocaleDateString('fr-FR')}</p>
          <p class="game">${clip.game}</p>
        </div>
      </div>
      <div class="twitch-card-infos-author">
        <div class="author-avatar" style="background-image: url(${clip.curator.logo})"></div>
        <div class="author-name">${clip.curator.display_name}</div>
      </div>
    </div>
    <a href=${clip.url}></a>
  </div>
  `;
};

const renderTitle = title => {
  if (title.length >= 25) {
    return `${title.substring(0, 25)}...`;
  } else {
    return title;
  }
};

window.addEventListener('click', event => {
    if(event.target.href !== undefined){
        chrome.tabs.create({url: event.target.href});
    }
});

document.addEventListener("DOMContentLoaded", () => {
  getTwitchClips(channel, clientId);
});
