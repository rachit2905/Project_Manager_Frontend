import api from "@/config/api";
import {
    FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAILURE,
    FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS, FETCH_ISSUE_BY_ID_FAILURE,
    UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE,
    CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, CREATE_ISSUE_FAILURE,
    DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE,
    ASSIGN_ISSUE_TO_USER_REQUEST, ASSIGN_ISSUE_TO_USER_SUCCESS, ASSIGN_ISSUE_TO_USER_FAILURE
} from "./ActionTypes";

// Fetch issues
export const fetchIssues = (id) => async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    try {
        const { data } = await api.get(`/api/issues/project/${id}`);
        console.log("Fetched issues", data);
        dispatch({ type: FETCH_ISSUES_SUCCESS, issues: data });
    } catch (error) {
        console.error("Fetch issues error", error);
        dispatch({ type: FETCH_ISSUES_FAILURE, error: error.message });
    }
}

// Fetch issue by ID
export const fetchIssueById = (issueId) => async (dispatch) => {
    dispatch({ type: FETCH_ISSUE_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/issues/${issueId}`);
        console.log("Fetched issue by ID", data);
        dispatch({ type: FETCH_ISSUE_BY_ID_SUCCESS, issues: data });
    } catch (error) {
        console.error("Fetch issue by ID error", error);
        dispatch({ type: FETCH_ISSUE_BY_ID_FAILURE, error: error.message });
    }
}

// Update issue status
export const updateIssueStatus = (issueId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
    try {
        const { data } = await api.put(`/api/issues/${issueId}?status=` + status);
        console.log("Updated issue status", data);
        dispatch({ type: UPDATE_ISSUE_STATUS_SUCCESS, issue: data });
    } catch (error) {
        console.error("Update issue status error", error);
        dispatch({ type: UPDATE_ISSUE_STATUS_FAILURE, error: error.message });
    }
}

// Create issue
export const createIssue = (issueData, userId) => async (dispatch) => {
    dispatch({ type: CREATE_ISSUE_REQUEST });
    try {
        console.log(issueData)
        console.log(userId)
        const { data } = await api.post("/api/issues?userId=" + userId, issueData);
        console.log("Created issue", data);
        dispatch({ type: CREATE_ISSUE_SUCCESS, issue: data });
    } catch (error) {
        console.error("Create issue error", error);
        dispatch({ type: CREATE_ISSUE_FAILURE, error: error.message });
    }
}

// Delete issue
export const deleteIssue = (issueId) => async (dispatch) => {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    try {
        await api.delete(`/api/issues/${issueId}`);
        console.log("Deleted issue", issueId);
        dispatch({ type: DELETE_ISSUE_SUCCESS, issueId });
    } catch (error) {
        console.error("Delete issue error", error);
        dispatch({ type: DELETE_ISSUE_FAILURE, error: error.message });
    }
}

// Assign issue to user
export const assignIssueToUser = (issueId, userId) => async (dispatch) => {
    dispatch({ type: ASSIGN_ISSUE_TO_USER_REQUEST });
    try {
        const { data } = await api.post(`/api/issues/assignUser?issueId=${issueId}&userId=${userId}`);
        console.log("Assigned issue to user", data);
        dispatch({ type: ASSIGN_ISSUE_TO_USER_SUCCESS, issue: data });
    } catch (error) {
        console.error("Assign issue error", error);
        dispatch({ type: ASSIGN_ISSUE_TO_USER_FAILURE, error: error.message });
    }
}
