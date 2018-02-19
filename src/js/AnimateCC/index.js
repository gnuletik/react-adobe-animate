import React from "react";
import PropTypes from "prop-types";
import init from "./adobeFunctions";

export default class AnimateCC extends React.Component {
  static propTypes = {
    composition: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    getAnimationObject: PropTypes.func,
    paused: PropTypes.bool,
  }

  static defaultProps = {
    getAnimationObject: () => {},
    paused: false,
  }

  constructor(props) {
    super();
    const comp = AdobeAn.getComposition(props.composition);
    const { properties } = comp.getLibrary();

    this.properties = properties;
  }

  componentDidMount() {
    init(
      this.props.composition,
      this.props.fileName,
      this.canvas,
      this.animationContainer,
      this.domOverlayContainer,
      l => (
        this.props.getAnimationObject(l),
        this.lib = l,
        this.lib.tickEnabled = !this.props.paused
      ),
    );
  }

  componentWillReceiveProps({ paused }) {
    this.lib.tickEnabled = !paused;
  }

  render() {
    return (
      <div>
        <div
          ref={el => this.animationContainer = el}
          style={{
            backgroundColor: this.properties.color,
            width: `${this.properties.width}px`,
            height: `${this.properties.height}px`,
          }}
        >
          <canvas
            ref={el => this.canvas = el}
            width={this.properties.width}
            height={this.properties.height}
            style={{
              position: "absolute",
              display: "block",
              backgroundColor: this.properties.color,
            }}
          />
          <div
            ref={el => this.domOverlayContainer = el}
            style={{
              pointerEvents: "none",
              overflow: "hidden",
              width: `${this.properties.width}px`,
              height: `${this.properties.height}px`,
              position: "absolute",
              left: "0px",
              top: "0px",
              display: "block",
            }}
          />
        </div>
      </div>
    );
  }
}
