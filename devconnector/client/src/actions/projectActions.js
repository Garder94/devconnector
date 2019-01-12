import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  DELETE_PROJECT,
  PROJECTS_LOADING
} from "./types";

//Add Project
export const addProject = projectData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/projects", projectData)
    .then(res =>
      dispatch({
        type: ADD_PROJECT,
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

//Add Comment
export const addComment = (projectId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/projects/comment/${projectId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
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

//Delete Comment
export const deleteComment = (projectId, commentId) => dispatch => {
  axios
    .delete(`/api/projects/comment/${projectId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
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

//Get Projects
export const getProjects = () => dispatch => {
  dispatch(setProjectLoading());
  axios
    .get("/api/projects")
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};

//Get Project
export const getProject = id => dispatch => {
  dispatch(setProjectLoading());
  axios
    .get(`/api/projects/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: null
      })
    );
};

//Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/projects/like/${id}`)
    .then(res => dispatch(getProjects()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/projects/unlike/${id}`)
    .then(res => dispatch(getProjects()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Project
export const deleteProject = id => dispatch => {
  axios
    .delete(`/api/projects/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
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
export const setProjectLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
