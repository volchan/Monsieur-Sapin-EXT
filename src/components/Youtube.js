import React, { Component } from "react";
import axios from "axios";

import keys from "../config/keys";

import "./Youtube.css";

export default class Youtube extends Component {
  async fetchVideos(url) {
    const res = await axios.get(url);
    const videos = res.data.items;
    this.displayVideos(videos);
  }

  displayVideos(videos) {
    const youtubeContainer = document.getElementById("youtube");
    const renderedVideos = videos.map(video => this.renderVideo(video));
    youtubeContainer.innerHTML = renderedVideos.join(" ");
  }

  renderVideo(video) {
    return `
      <div class="card youtube" style="background-image: url('${
        video.snippet.thumbnails.high.url
      }')">
        <div class="card-infos youtube">
          <p class="date">${new Date(
            video.snippet.publishedAt
          ).toLocaleDateString("fr-FR")}</p>
          <p class="title">${this.renderTitle(video.snippet.title, 50)}</p>
        </div>
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}"></a>
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
      if (alarm.name == "youtube") {
        const params = `?part=snippet&maxResults=25&order=date&type=video&channelId=${
          keys.ytChannelID
        }&key=${keys.ytClientID}`;
        const url = `https://www.googleapis.com/youtube/v3/search${params}`;
        this.fetchVideos(url);
      }
    })
  }

  render() {
    return <div id="youtube" className="tab-content" />;
  }
}
