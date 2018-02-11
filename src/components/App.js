import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

import Header from "./Header";
import Content from "./Content";

import "./App.css";
import "../scripts/twitterWidget";

class App extends Component {
  componentDidMount() {
    chrome.alarms.create("youtube", { when: Date.now() + 1000 })
    chrome.alarms.create("twitch", { when: Date.now() + 1000 });
    chrome.alarms.create("twitter", { when: Date.now() + 1000 });
    chrome.alarms.create("live", { when: Date.now() + 1000, periodInMinutes: 1 });
    window.addEventListener("click", event => {
      if (event.target.href !== undefined) {
        chrome.tabs.create({ url: event.target.href });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="site">
          <Header />
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
