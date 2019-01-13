import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { addLike, removeLike } from "../../actions/postActions";
import laser from "./laser_cut.jpg";
import wood from "./wood.jpg";

class MainItem extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-sm-6 portfolio-item my-3">
            <div className="card flex-column ">
              <div className="card-img">
                <a href="/projects/form-project">
                  <img
                    className="card-img-top img-fluid"
                    src={wood}
                    alt=""
                    style={{ height: "200px !important;" }}
                  />
                </a>
              </div>
              <div className="card-body">
                <p className="category" />
                <h4 className="card-title">Form project</h4>
                <p className="card-text">Form project short</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6 portfolio-item my-3">
            <div className="card flex-column ">
              <div className="card-img">
                <a href="/projects/form-project">
                  <img
                    className="card-img-top img-fluid"
                    src={laser}
                    alt=""
                    style={{ height: "200px !important;" }}
                  />
                </a>
              </div>
              <div className="card-body">
                <p className="category" />
                <h4 className="card-title">Form project</h4>
                <p className="card-text">Form project short</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainItem.defaultProps = {
  showActions: true
};

MainItem.propTypes = {
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired,
  //post: propTypes.object.isRequired, Dette er prosjektene Dennis lager
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(MainItem);
