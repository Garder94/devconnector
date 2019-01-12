import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import { addAppointment } from "../../actions/appointmentActions";

import TextFieldGroup from "../common/TextFieldGroup";

class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slot_time_from: "",
      slot_time_to: "",
      slot_date: "",
      diff: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newAppointment = {
      slot_time_from: this.state.slot_time_from,
      slot_time_to: this.state.slot_time_to,
      slot_date: this.state.slot_date
    };

    this.props.addAppointment(newAppointment, this.props.history);
    window.location.reload();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Legg til booking av Laser kutter
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <h6>Hvilken dag vil du booke?</h6>
                <TextFieldGroup
                  name="slot_date"
                  type="date"
                  value={this.state.slot_date}
                  onChange={this.onChange}
                  error={errors.slot_date}
                />
                <h6>Fra klokken:</h6>
                <TextFieldGroup
                  placeHolder="* From"
                  name="slot_time_from"
                  type="time"
                  value={this.state.slot_time_from}
                  onChange={this.onChange}
                  error={errors.slot_time_from}
                />
                <h6>Til klokken:</h6>
                <TextFieldGroup
                  name="slot_time_to"
                  type="time"
                  value={this.state.slot_time_to}
                  onChange={this.onChange}
                  error={errors.slot_time_to}
                />
              </div>
              {this.state.slot_time_to > this.state.slot_time_from &&
              moment
                .utc(
                  moment(this.state.slot_time_to, "HH:mm").diff(
                    moment(this.state.slot_time_from, "HH:mm")
                  )
                )
                .format("HH:mm") <= "03:00" ? (
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AppointmentForm.propTypes = {
  addAppointment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addAppointment }
)(withRouter(AppointmentForm));
