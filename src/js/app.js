import React from "react";
import ReactDOM from "react-dom";
import AnimateCC from "react-adobe-animate"; // eslint-disable-line import/no-extraneous-dependencies

export default class Component extends React.Component {
  constructor() {
    super();
    this.state = {
      paused: true,
    };
  }

  onClick = () => this.setState({ paused: !this.state.paused })

  getAnimationObject = obj => (this.animationObject = obj)

  render() {
    return (
      <div style={{ width: "400px" }}>
        <p>asd</p>
        <AnimateCC
          animationName="lishtml5"
          getAnimationObject={this.getAnimationObject}
          paused={this.state.paused}
        />

        <button onClick={this.onClick}>{this.state.paused ? "Unpause" : "Pause"}</button>
      </div>
    );
  }
}

ReactDOM.render(<Component />, document.getElementById("app"));