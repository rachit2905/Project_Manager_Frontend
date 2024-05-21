import api from "@/config/api";
import {
    FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE,
    DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE
} from "./ActionTypes";

// Fetch comments
export const fetchComments = (issueId) => async (dispatch) => {
    dispatch({ type: FETCH_COMMENTS_REQUEST });
    try {
        const { data } = await api.get(`/api/comments/${issueId}`);
        console.log("Fetched comments", data);
        dispatch({ type: FETCH_COMMENTS_SUCCESS, comments: data });
    } catch (error) {
        console.error("Fetch comments error", error);
        dispatch({ type: FETCH_COMMENTS_FAILURE, error: error.message });
    }
}

// Delete comment
export const deleteComment = ({ commentId, userId }) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
        await api.delete(`/api/comments?commentId=${commentId}&userId=${userId}`);
        console.log("Deleted comment", commentId);
        dispatch({ type: DELETE_COMMENT_SUCCESS, commentId });
    } catch (error) {
        console.error("Delete comment error", error);
        dispatch({ type: DELETE_COMMENT_FAILURE, error: error.message });
    }
}

// Create comment
export const createComment = (commentData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
        console.log(commentData);
        const { data } = await api.post(`/api/comments`, commentData);
        console.log("Created comment", data);
        dispatch({ type: CREATE_COMMENT_SUCCESS, comment: data });
    } catch (error) {
        console.error("Create comment error", error);
        dispatch({ type: CREATE_COMMENT_FAILURE, error: error.message });
    }
}
