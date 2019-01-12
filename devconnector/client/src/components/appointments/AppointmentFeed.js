import React, { Component } from "react";
import propTypes from "prop-types";
import AppointmentItem from "./AppointmentItem";

class AppointmentFeed extends Component {
  render() {
    const { appointments } = this.props;

    return appointments.map(appointment => (
      <AppointmentItem key={appointment._id} appointment={appointment} />
    ));
  }
}

AppointmentFeed.propTypes = {
  appointments: propTypes.array.isRequired
};

export default AppointmentFeed;
