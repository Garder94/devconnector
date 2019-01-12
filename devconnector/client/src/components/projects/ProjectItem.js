import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deleteProject,
  addLike,
  removeLike
} from "../../actions/projectActions";

class ProjectItem extends Component {
  onDeleteClick(id) {
    this.props.deleteProject(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { project, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={project.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{project.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{project.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, project._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(project.likes)
                    })}
                  />
                  <span className="badge badge-light">
                    {project.likes.length}
                  </span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, project._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link
                  to={`/project/${project._id}`}
                  className="btn btn-info mr-1"
                >
                  Comments
                </Link>
                {project.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, project._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.defaultProps = {
  showActions: true
};

ProjectItem.propTypes = {
  deleteProject: propTypes.func.isRequired,
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired,
  project: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProject, addLike, removeLike }
)(ProjectItem);
