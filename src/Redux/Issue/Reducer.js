import {
    FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAILURE,
    FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS, FETCH_ISSUE_BY_ID_FAILURE,
    UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE,
    CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, CREATE_ISSUE_FAILURE,
    DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE,
    ASSIGN_ISSUE_TO_USER_REQUEST, ASSIGN_ISSUE_TO_USER_SUCCESS, ASSIGN_ISSUE_TO_USER_FAILURE
} from "./ActionTypes";

const initialState = {
    issues: [],
    issueDetails: null,
    loading: false,
    error: null
};

export const issueReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ISSUES_REQUEST:
        case FETCH_ISSUE_BY_ID_REQUEST:
        case UPDATE_ISSUE_STATUS_REQUEST:
        case CREATE_ISSUE_REQUEST:
        case DELETE_ISSUE_REQUEST:
        case ASSIGN_ISSUE_TO_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ISSUES_SUCCESS:
            return {
                ...state, loading: false, issues: action.issues, error: null
            };
        case FETCH_ISSUE_BY_ID_SUCCESS:
            return {
                ...state, loading: false, issueDetails: action.issues, error: null
            };
        case UPDATE_ISSUE_STATUS_SUCCESS:
            return {
                ...state, loading: false, issueDetails: action.issue, error: null
            };
        case CREATE_ISSUE_SUCCESS:
            return {
                ...state, loading: false, issues: [...state.issues, action.issue]
            }
        case ASSIGN_ISSUE_TO_USER_SUCCESS:
            return { ...state, loading: false, issues: state.issues.map((issue) => issue.id === action.issue.id ? action.issue : issue) }
        case DELETE_ISSUE_SUCCESS:
            return {
                ...state, loading: false, issues: state.issues.filter((issue) => issue.id !== action.issueId), error: null
            };
        case FETCH_ISSUES_FAILURE:
        case FETCH_ISSUE_BY_ID_FAILURE:
        case UPDATE_ISSUE_STATUS_FAILURE:
        case CREATE_ISSUE_FAILURE:
        case DELETE_ISSUE_FAILURE:
        case ASSIGN_ISSUE_TO_USER_FAILURE:
            return {
                ...state, loading: false, error: action.error
            };
        default:
            return state;
    }
};
