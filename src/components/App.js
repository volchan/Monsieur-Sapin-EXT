import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";
import Navbar from "./Navbar";
import Content from "./Content";
import Button from "./Button";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: null,
      activeTab: "twitch"
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(request => {
      if (request.stream) {
        this.setState({ stream: request.stream });
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("click", event => {
        if (event.target.href !== undefined) {
          chrome.tabs.create({ url: event.target.href });
        }
      });
    });
  }

  handleTabClick(tab) {
    this.setState({ activeTab: tab });
  }

  displayBtns() {
    switch (this.state.activeTab) {
      case "youtube":
        return (
          <Button
            id={"youtube-btn"}
            classes={"btn"}
            href={"https://www.youtube.com/monsieursapin"}
            text={"Accéder à la chaine youtube!"}
            stream={this.state.stream}
          />
        );
        break;
      default:
        return (
          <Button
            id={"twitch-btn"}
            classes={"btn"}
            href={"https://www.twitch.tv/monsieursapin"}
            text={"Accéder à la chaine twitch!"}
            stream={this.state.stream}
          />
        );
    }
  }

  render() {
    return (
      <div className="site">
        <div className="header">
          <Header stream={this.state.stream} />
          <Navbar onTabClick={this.handleTabClick} />
        </div>
        {this.displayBtns()}
        <Content activeTab={this.state.activeTab} />
      </div>
    );
  }
}

export default connect(null)(App);
