import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import keys from "../config/keys";

import "./Navbar.css";

export default class Navbar extends Component {
  removeActiveClasses(elem) {
    const elements = document.querySelectorAll(elem);
    _.each(elements, el => {
      el.classList.remove("active");
    });
  }

  handleClick(clicked) {
    console.log(clicked);
    this.removeActiveClasses(".tab-link");
    const tab = document.getElementById(`${clicked}-tab`);
    tab.classList.add("active");
    this.props.onTabClick(clicked);
  }

  render() {
    return (
      <div className="nav">
        <div className="tabs">
          <div
            className="tab-link active"
            onClick={() => this.handleClick("twitch")}
            id="twitch-tab"
          >
            CLIPS TWITCH
          </div>
          <div
            className="tab-link"
            onClick={() => this.handleClick("youtube")}
            id="youtube-tab"
          >
            YOUTUBE
          </div>
          <div
            className="tab-link"
            onClick={() => this.handleClick("twitter")}
            id="twitter-tab"
          >
            TWITTER
          </div>
        </div>
      </div>
    );
  }
}
