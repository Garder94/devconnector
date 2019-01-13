import React, { Component } from "react";
import bg4 from "./bg4.mp4";

class MainForm extends Component {
  render() {
    return (
      <div className="container py-2">
        <div className="row">
          <div className="col-12">
            <div className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <video
                    className="video-backgroung rounded"
                    preload="true"
                    muted="true"
                    autoplay="true"
                    loop="true"
                  >
                    <source src={bg4} type="video/mp4" />
                  </video>
                  <div className="container">
                    <div
                      className="carousel-caption text-center rounded"
                      style={{ background: "rgba(51, 51, 51, 0.4)" }}
                    >
                      <h1 style={{ color: "black" }}>Got a maker in you?</h1>
                      <h5 style={{ color: "black" }}>
                        Join our makerspace community
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainForm;
