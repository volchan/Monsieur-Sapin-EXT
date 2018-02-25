import React, { Component } from "react";

import Twitch from "./Twitch";
import Youtube from "./Youtube";
import Twitter from "./twitter";

import "./Content.css";

export default class Content extends Component {
  displayActiveContent() {
    switch (this.props.activeTab) {
      case "twitch":
        return <Twitch />
        break;
      case "youtube":
        return <Youtube />
        break;
      case "twitter":
        return <Twitter />
        break;
    }

  }

  renderContent() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.displayActiveContent()}
      </div>
    );
  }

  render() {
    return <div className="content">{this.renderContent()}</div>;
  }
}
