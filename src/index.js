const channel = "monsieursapin";
const twitchClientId = "You won't get ir here :D !";

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
          <p class="date">${new Date(clip.created_at).toLocaleDateString(
            "fr-FR"
          )}</p>
          <p class="game">${clip.game}</p>
        </div>
      </div>
      <div class="twitch-card-infos-author">
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

const renderTitle = title => {
  if (title.length >= 25) {
    return `${title.substring(0, 25)}...`;
  } else {
    return title;
  }
};

window.addEventListener("click", event => {
  if (event.target.href !== undefined) {
    chrome.tabs.create({ url: event.target.href });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  getTwitchClips(channel, twitchClientId);
  const tabLinks = document.querySelectorAll(".tab-link");
  tabLinks.forEach(tabLink => {
    tabLink.addEventListener("click", ({ target }) => {
      const tabId = target.dataset.tab;
      const activeTab = document.getElementsByClassName("tab-link active")[0];

      const tabContent = document.getElementById(tabId);
      const activeTabContent = document.getElementsByClassName("tab-content active")[0];

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

  window.twttr = ((d, s, id) => {
    let js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  })(document, "script", "twitter-wjs");
});
