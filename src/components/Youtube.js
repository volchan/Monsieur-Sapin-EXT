import React, { Component } from "react";

import YoutubeVideo from "./YoutubeVideo";
import Loading from "./Loading";

import "./Youtube.css";

export default class Youtube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      youtubeVods: null
    };
  }

  componentDidMount() {
    chrome.runtime.sendMessage({ from: "youtube" }, (response) => {
      if (chrome.runtime.lastError) {
          console.log("ERROR: ", chrome.runtime.lastError);
      } else {
          const vods = response.vods;
          this.setState({ youtubeVods: vods });
      }
    });
  }

  renderContent() {
    if (this.state.youtubeVods) {
      return _.map(this.state.youtubeVods, vod => {
        return <YoutubeVideo key={vod.id.videoId} video={vod} />;
      });
    } else {
      return <Loading />;
    }
  }

  render() {
    return (
      <div id="youtube" className="tab-content">
        {this.renderContent()}
      </div>
    );
  }
}
