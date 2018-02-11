import React, { Component } from "react";

import Twitch from "./Twitch";
import Youtube from "./Youtube";
import Button from "./Button";

import "./Content.css";

export default class Content extends Component {
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
        <div id="twitter" className="tab-content">
          <a
            className="twitter-timeline"
            href="https://twitter.com/monsieursapin_"
            data-lang="fr"
            data-width="100%"
            data-height="100%"
            data-link-color="#6f9e5a"
            data-chrome="noheader noscrollbar nofooter transparent noborders"
          />
        </div>
      </div>
    );
  }
}
