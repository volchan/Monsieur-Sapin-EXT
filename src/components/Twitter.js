import React, { Component } from "react";
import { Timeline } from "react-twitter-widgets";

export default class Twitter extends Component {
  render() {
    return (
      <div id="twitter" className="tab-content">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "monsieursapin_"
          }}
          options={{
            lang: "fr",
            height: "448",
            width: "400",
            linkColor: "#6f9e5a",
            chrome: "noheader noscrollbar nofooter transparent noborders"
          }}
        />
      </div>
    );
  }
}
