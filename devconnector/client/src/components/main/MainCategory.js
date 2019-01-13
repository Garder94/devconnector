import React, { Component } from "react";
import image from "./200x200.png";

class MainCategory extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6 portfolio-item my-3">
            <div className="card flex-column ">
              <div className="card-img">
                <a>
                  <img
                    className="card-img-top img-fluid"
                    src={image}
                    alt="Category Picture"
                    style={{ height: "200px !important;" }}
                  />
                </a>
              </div>
              <div className="card-body">
                <a href="/project-feed" className="category">
                  3D Printing
                </a>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6 portfolio-item my-3">
            <div className="card flex-column ">
              <div className="card-img">
                <a>
                  <img
                    className="card-img-top img-fluid"
                    src={image}
                    alt=""
                    style={{ height: "200px !important;" }}
                  />
                </a>
              </div>
              <div className="card-body">
                <a href="/project-feed" className="category">
                  Woodworking
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCategory;
