import React, { Component } from "react";
import propTypes from "prop-types";
import ProjectItem from "./ProjectItem";

class ProjectFeed extends Component {
  render() {
    const { projects } = this.props;

    return projects.map(project => (
      <ProjectItem key={project._id} project={project} />
    ));
  }
}

ProjectFeed.propTypes = {
  projects: propTypes.array.isRequired
};

export default ProjectFeed;
