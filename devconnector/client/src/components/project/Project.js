import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProject } from "../../actions/projectActions";
import ProjectItem from "../projects/ProjectItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  render() {
    const { project, loading } = this.props.project;
    let projectContent;

    if (project === null || loading || Object.keys(project).length === 0) {
      projectContent = <Spinner />;
    } else {
      projectContent = (
        <div>
          <ProjectItem project={project} showActions={false} />
          <CommentForm projectId={project._id} />
          <CommentFeed projectId={project._id} comments={project.comments} />
        </div>
      );
    }

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {projectContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  getPost: propTypes.func.isRequired,
  project: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProject }
)(Project);
