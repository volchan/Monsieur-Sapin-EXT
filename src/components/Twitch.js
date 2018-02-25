import React, { Component } from "react";

import TwitchClip from "./TwitchClip";
import Loading from "./Loading";
import "./Twitch.css";

export default class Twitch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      twitchClips: null
    }
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(request => {
      if (request.twitchClips) {
        this.setState({ twitchClips: request.twitchClips });
      }
    });
  }

  renderContent() {
    if (this.state.twitchClips) {
      return _.map(this.state.twitchClips, clip => {
        return (
          <TwitchClip
            key={clip.tracking_id} clip={clip}
          />
        );
      });
    } else {
      return <Loading />
    }
  }

  render() {
    return (
      <div id="twitch" className="tab-content">
        {this.renderContent()}
      </div>
    );
  }
}
