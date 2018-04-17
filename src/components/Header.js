import React, { Component } from "react";
import { connect } from "react-redux";

import "./Header.css";

export default class Header extends Component {
  displayViewerCount(stream) {
    switch (stream) {
      case null:
        return <div className="viewer-count"><p>offline</p> <span> </span></div>;
        break;
      default:
        return <div className="viewer-count live"><p>{stream.viewers}</p> <span> </span></div>;
    }
  }

  render() {
    return (
      <div className="banner">{this.displayViewerCount(this.props.stream)}</div>
    );
  }
}
