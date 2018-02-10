import React, { Component } from "react";

import "./Button.css";

export default class Botton extends Component {
  componentDidMount() {
    this.checkLive();
  }

  checkLive() {
    const twitchBtn = document.getElementById("twitch-btn").childNodes[0];
    chrome.storage.local.get(
      {
        stream: ""
      },
      items => {
        console.log(items.stream);
        if (items.stream) {
          twitchBtn.innerText = "Monsieur sapin est en live!"
        }
      }
    )
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.classes}>
        <a href={this.props.href}>{this.props.text}</a>
      </div>
    );
  }
}
