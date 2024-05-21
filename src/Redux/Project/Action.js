import api, { API_BASE_URL } from "@/config/api";
import axios from "axios";
import {
    ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_FAILURE,
    CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
    FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_BY_ID_FAILURE,
    FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE,
    INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, INVITE_TO_PROJECT_FAILURE,
    SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS, SEARCH_PROJECT_FAILURE
} from "./ActionTypes";

export const fetchProjects = ({ category, tag }) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST });
    try {
        const { data } = await api.get(`/api/projects`, { params: { category, tag } });
        console.log("all projects", data);
        dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: FETCH_PROJECT_FAILURE, error: error.message });
    }
}

export const searchProjects = (keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_PROJECT_REQUEST });
    try {
        const { data } = await api.get(`/api/projects/search?keyword=` + keyword);
        console.log("search projects", data);
        dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: SEARCH_PROJECT_FAILURE, error: error.message });
    }
}

export const createProjects = (projectData) => async (dispatch) => {
    dispatch({ type: CREATE_PROJECT_REQUEST });
    try {
        console.log(projectData)
        const { data } = await api.post(`/api/projects`, projectData);
        console.log("created project", data);
        dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: CREATE_PROJECT_FAILURE, error: error.message });
    }
}

export const fetchProjectByID = ({ id }) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/projects/${id}`);
        console.log("fetched project", data);
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, error: error.message });
    }
}

export const deleteProject = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
        const { data } = await api.delete(`/api/projects/${id}`);
        console.log("deleted project", data);
        dispatch({ type: DELETE_PROJECT_SUCCESS, id });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: DELETE_PROJECT_FAILURE, error: error.message });
    }
}

export const inviteToProject = ({ email, projectId }) => async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
        const { data } = await api.post(`/api/projects/sendInvitation`, { email, projectId });
        console.log("invite project", data);
        dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: INVITE_TO_PROJECT_FAILURE, error: error.message });
    }
}

export const acceptInvitation = ({ invitationToken, navigate }) => async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
        const { data } = await api.get(`/api/projects/acceptInvite?token=` + invitationToken);
        console.log("accept invitation project", data);
        navigate("/project/" + data.projectId);
        dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
        console.error("error", error);
        dispatch({ type: ACCEPT_INVITATION_FAILURE, error: error.message });
    }
}
