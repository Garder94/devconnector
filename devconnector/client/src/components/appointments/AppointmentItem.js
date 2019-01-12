import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { deleteAppointment } from "../../actions/appointmentActions";

class AppointmentItem extends Component {
  onDeleteClick(id) {
    this.props.deleteAppointment(id);
  }

  render() {
    const { appointment, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={appointment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{appointment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">
              Dato:
              {appointment.slot_date} Fra:
              {appointment.slot_time_from} Til: {appointment.slot_time_to}
            </p>
            {appointment.slot_time_to - appointment.slot_time_from > 3 ? (
              <p>Timene er mer enn 3 </p>
            ) : (
              appointment.slot_time_from.toString()
            )}
            {showActions ? (
              <span>
                {appointment.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, appointment._id)}
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

AppointmentItem.defaultProps = {
  showActions: true
};

AppointmentItem.propTypes = {
  deleteAppointment: propTypes.func.isRequired,
  appointment: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAppointment }
)(AppointmentItem);
