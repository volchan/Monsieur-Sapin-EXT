import React, { Component } from "react";
import axios from "axios";

import keys from "../config/keys";

import "./Twitch.css";

export default class Twitch extends Component {
  async fetchClips(url, clientId) {
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": keys.twitchClientID
      }
    });

    const clips = res.data.clips;
    this.displayClips(clips);
  }

  displayClips(clips) {
    const twitchContainer = document.getElementById("twitch");
    const renderedClips = clips.map(clip => this.renderClip(clip));
    twitchContainer.innerHTML = renderedClips.join("");
  }

  renderClip(clip) {
    return `
      <div class="card" style="background-image: url(${
        clip.thumbnails.medium
      })">
        <div class="card-infos">
          <div class="card-infos-game-title">
            <div class="card-infos-title">
              <p class="title">${this.renderTitle(clip.title, 25)}</p>
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
  }

  renderTitle(title, length) {
    if (title.length >= length) {
      return `${title.substring(0, length)}...`;
    } else {
      return title;
    }
  }

  componentDidMount() {
    chrome.alarms.onAlarm.addListener(alarm => {
      if (alarm.name == "twitch") {
        const url = `https://api.twitch.tv/kraken/clips/top?channel=${
          keys.channel
        }&limit=20`;
        this.fetchClips(url, keys.twitchClientID);
      }
    });
  }

  render() {
    return <div id="twitch" className="tab-content active" />;
  }
}
