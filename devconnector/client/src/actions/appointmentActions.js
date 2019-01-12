import axios from "axios";

import {
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  APPOINTMENTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//Add Appointment
export const addAppointment = appointmentData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/appointments", appointmentData)
    .then(res =>
      dispatch({
        type: ADD_APPOINTMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get Appointment
export const getAppointment = id => dispatch => {
  dispatch(setAppointmentLoading());
  axios
    .get(`/api/appointments/${id}`)
    .then(res =>
      dispatch({
        type: GET_APPOINTMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPOINTMENT,
        payload: null
      })
    );
};

//Get Appointments
export const getAppointments = () => dispatch => {
  dispatch(setAppointmentLoading());
  axios
    .get("/api/appointments")
    .then(res =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        GET_APPOINTMENTS,
        payload: null
      })
    );
};

//Delete Appointment
export const deleteAppointment = id => dispatch => {
  axios
    .delete(`/api/appointments/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_APPOINTMENT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set loading state
export const setAppointmentLoading = () => {
  return {
    type: APPOINTMENTS_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
