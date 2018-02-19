import React from "react";
import ReactDOM from "react-dom";

import AnimateCC from "./AnimateCC";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      paused: true,
    };
  }

  onClick = () => this.setState({ paused: !this.state.paused })

  getAnimationObject = obj => (this.lis = obj, window.lis = obj)

  render() {
    return (
      <div>
        <AnimateCC
          fileName="lishtml5"
          composition="C1475B64B160904BB90B34246A5FF54B"
          getAnimationObject={this.getAnimationObject}
          paused={this.state.paused}
        />

        <button onClick={this.onClick}>Click!</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
