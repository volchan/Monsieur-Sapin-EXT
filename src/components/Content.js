import React, { Component } from "react";

import Twitch from "./Twitch";
import Youtube from "./Youtube";
import Button from "./Button";

import "./Content.css";

export default class Content extends Component {
  componentDidMount() {
    console.log("before alert:", new Date);
    chrome.alarms.onAlarm.addListener(alarm => {
      if (alarm.name == "twitter") {
        console.log("inside alert:", new Date);
        this.buildTwitterFeed();
      }
    });
  }

  buildTwitterFeed() {
    twttr.widgets.createTimeline(
      {
        sourceType: "profile",
        screenName: "monsieursapin_"
      },
      document.getElementById("twitter"),
      {
        lang: "fr",
        width: "100%",
        height: "100%",
        linkColor: "#6f9e5a",
        chrome: "noheader noscrollbar nofooter transparent noborders"
      }
    );
  }

  render() {
    return (
      <div className="content">
        <Button
          id={"twitch-btn"}
          classes={"btn active"}
          href={"https://www.twitch.tv/monsieursapin"}
          text={"Accéder à la chaine twitch!"}
        />
        <Button
          id={"youtube-btn"}
          classes={"btn"}
          href={"https://www.youtube.com/monsieursapin"}
          text={"Accéder à la chaine youtube!"}
        />
        <Twitch />
        <Youtube />
        <div id="twitter" className="tab-content" />
      </div>
    );
  }
}
