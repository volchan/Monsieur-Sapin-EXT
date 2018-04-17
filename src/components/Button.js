import React, { Component } from "react";

import "./Button.css";

export default class Botton extends Component {
  displayText(id, stream, text) {
    switch (id) {
      case "youtube-btn":
        return text;
        break;
      default:
        return this.displayTwitchText(stream, text);
    }
  }

  displayTwitchText(stream, text) {
    switch (stream) {
      case null:
        return text;
        break;
      default:
        return "Monsieur sapin est en live!";
    }
  }

  render() {
    const { id, classes, href, stream, text } = this.props;
    return (
      <div id={id} className={classes}>
        <a href={href}>{this.displayText(id, stream, text)}</a>
      </div>
    );
  }
}
