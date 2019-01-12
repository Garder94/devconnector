import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAppointment } from "../../actions/appointmentActions";
import propTypes from "prop-types";

class Appointment extends Component {
  componentDidMount() {
    this.props.getAppointment(this.props.match.params.id);
  }

  render() {
    const { appointment, loading } = this.props.appointment;
    let appointmentContent;

    if (
      appointment === null ||
      loading ||
      Object.keys(appointment).length === 0
    ) {
      appointmentContent = <Spinner />;
    } else {
      appointmentContent = (
        <div>
          <p>Test</p>
        </div>
      );
    }
    return (
      <div className="appointment">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {appointmentContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Appointment.propTypes = {
  getAppointment: propTypes.func.isRequired,
  appointment: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  appointment: state.appointment
});

export default connect(
  mapStateToProps,
  { getAppointment }
)(Appointment);
