import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="site">
            <h1>hello</h1>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
