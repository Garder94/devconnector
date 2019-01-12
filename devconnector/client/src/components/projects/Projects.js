import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import ProjectForm from "./ProjectForm";
import Spinner from "../common/Spinner";
import { getProjects } from "../../actions/projectActions";
import ProjectFeed from "./ProjectFeed";

class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects, loading } = this.props.project;
    let projectContent;

    if (projects === null || loading) {
      projectContent = <Spinner />;
    } else {
      projectContent = <ProjectFeed projects={projects} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ProjectForm />
              {projectContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  getProjects: propTypes.func.isRequired,
  project: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Projects);
