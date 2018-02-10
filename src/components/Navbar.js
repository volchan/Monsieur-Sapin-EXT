import React, { Component } from "react";

import "./Navbar.css";

export default class Navbar extends Component {
  componentDidMount() {
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach(tabLink => {
      tabLink.addEventListener("click", ({ target }) => {
        const tabId = target.dataset.tab;
        const activeTab = document.getElementsByClassName("tab-link active")[0];

        const tabContent = document.getElementById(tabId);
        const activeTabContent = document.getElementsByClassName(
          "tab-content active"
        )[0];

        const btn = document.getElementById(`${tabId}-btn`);
        const activeBtn = document.getElementsByClassName("btn active")[0];
        const twitchBtn = document.getElementById("twitch-btn");

        activeTab.classList.remove("active");
        target.classList.add("active");

        if (btn != null) {
          activeBtn.classList.remove("active");
          btn.classList.add("active");
        } else {
          activeBtn.classList.remove("active");
          twitchBtn.classList.add("active");
        }
        activeTabContent.classList.remove("active");
        tabContent.classList.add("active");
      });
    });
  }

  render() {
    return (
      <div className="nav">
        <div className="tabs">
          <div className="tab-link active" data-tab="twitch">
            CLIPS TWITCH
          </div>
          <div className="tab-link" data-tab="youtube">
            YOUTUBE
          </div>
          <div className="tab-link" data-tab="twitter">
            TWITTER
          </div>
        </div>
      </div>
    );
  }
}
