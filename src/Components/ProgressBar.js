import React from "react";
import "../Styles/ProgressBar.css";

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
 

  render() {
    return (
      <div
        className="container"
        onClick={!this.props.disabled ? this.props.onClick : null}
      >
        <div
          className={`progressbar-container ${
            this.props.disabled ? "disabled" : ""
          }`}
        >
          <div
            className="progressbar-complete"
            style={{
              width: `${this.props.percent}%`,
            }}
          >
            <div className="progressbar-liquid"></div>
          </div>
          <span className="progress">{this.props.text}</span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
