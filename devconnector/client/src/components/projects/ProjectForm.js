import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { addProject } from "../../actions/projectActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import axios from "axios";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
      file: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  fileChangedHandler = event => {
    console.log("Selected file: ", event.target.files[0]);

    this.setState({
      file: event.target.files[0]
    });
  };

  uploadHandler = () => {};

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("projects/upload", formData, config)
      .then(res => {
        alert("The file is uploaded");
      })
      .catch(err => console.log(err));

    const { user } = this.props.auth;

    const newProject = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addProject(newProject);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <p className="card-text">Please upload images for the project</p>
              <input type="file" onChange={this.fileChangedHandler} />
              <div className="mt-5" />
              <div className="form-group">
                <TextAreaFieldGroup
                  placeHolder="Create a project"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProjectForm.propTypes = {
  addProject: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addProject }
)(ProjectForm);
