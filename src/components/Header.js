import React, { Component } from "react";
import { connect } from "react-redux";

import "./Header.css";

import Navbar from "./Navbar";

export default class Header extends Component {
  componentDidMount() {
    const playAudio = () => {
      const audio = document.querySelector("audio");
      audio.volume = 0.5;
      audio.play();
    };

    document.getElementById("fretille").addEventListener("click", () => {
      playAudio();
    });
  }

  render() {
    return (
      <div className="header">
        <div className="banner">
          <div id="fretille"></div>
          <audio>
            <source src="../assets/audio/easter_egg_fretille.mp3" type="audio/mpeg" />
          </audio>
        </div>
        <Navbar />
      </div>
    )
  }
};
