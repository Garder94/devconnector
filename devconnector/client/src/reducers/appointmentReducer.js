import {
  ADD_APPOINTMENT,
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  APPOINTMENTS_LOADING,
  DELETE_APPOINTMENT
} from "../actions/types";

const initialState = {
  appointments: [],
  appointment: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APPOINTMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        loading: false
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
        loading: false
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [action.payload, ...state.appointments]
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          appointment => appointment._id !== action.payload
        )
      };
    default:
      return state;
  }
}
