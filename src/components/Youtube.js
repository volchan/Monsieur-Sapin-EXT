import React, { Component } from "react";

import YoutubeVideo from "./YoutubeVideo";
import Loading from "./Loading";

import "./Youtube.css";

export default class Youtube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      youtubeVods: null,
      mounted: false
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    chrome.runtime.onMessage.addListener(request => {
      if (request.youtubeVods && this.state.mounted) {
        this.setState({ youtubeVods: request.youtubeVods });
      }
    });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
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
