import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAppointments,
  deleteAppointment
} from "../../actions/appointmentActions";
import AppointmentForm from "./AppointmentForm";
import Spinner from "../common/Spinner";
import AppointmentFeed from "./AppointmentFeed";
import axios from "axios";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "moment/locale/nb";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("nb");

//BigCalendar.momentLocalizer(moment);

class Appointments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cal_events: []
    };
  }

  onDeleteClick(id) {
    this.props.deleteAppointment(id);
  }

  componentDidMount() {
    let self = this;
    axios
      .get("/api/appointments")
      .then(res => {
        let appointments = res.data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = moment(
            appointments[i].slot_date + " " + appointments[i].slot_time_from
          ).toDate();
          appointments[i].end = moment(
            appointments[i].slot_date + " " + appointments[i].slot_time_to
          ).toDate();
          appointments[i].title = appointments[i].name;
          appointments[i].id = appointments[i]._id;
        }
        self.setState({
          cal_events: appointments
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSelectEvent(pEvent) {
    const { auth } = this.props;
    const r = window.confirm("Would you like to remove this event?");
    if (r === true && auth.user.id === pEvent.user) {
      this.props.deleteAppointment(pEvent._id);
      window.location.reload();
      alert("Du har nå slettet din booking");
    } else {
      alert("Du kan ikke slette andre sin booking!!");
    }
  }

  render() {
    const { cal_events } = this.state;

    const localizer = BigCalendar.momentLocalizer(moment);
    const { appointments, loading } = this.props.appointment;
    let appointmentContent;

    if (appointments === null || loading) {
      appointmentContent = <Spinner />;
    } else {
      appointmentContent = <AppointmentFeed appointments={appointments} />;
    }
    return (
      <div className="appointments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div style={{ height: 400 }}>
                <BigCalendar
                  localizer={localizer}
                  events={cal_events}
                  step={60}
                  defaultView="month"
                  views={["month", "week", "day", "agenda"]}
                  //onDeleteEvent={this.onDeleteClick()}
                  onSelectEvent={event => this.onSelectEvent(event)}
                  defaultDate={new Date()}
                  timeslots={1}
                  min={new Date(0, 0, 0, 9, 0, 0)}
                  max={new Date(0, 0, 0, 21, 0, 0)}
                />
              </div>

              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Appointments.propTypes = {
  getAppointments: propTypes.func.isRequired,
  appointment: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  appointment: state.appointment,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAppointments, deleteAppointment }
)(Appointments);
