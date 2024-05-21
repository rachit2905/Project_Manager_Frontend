import api from "@/config/api"
import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGES_FAILURE, SEND_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ActionType"

export const sendMessage = (messageData) => {

    return async (dispatch) => {
        dispatch({ type: SEND_MESSAGES_REQUEST })
        try {
            console.log(messageData)
            const response = await api.post("/api/messages", messageData)
            dispatch({ type: SEND_MESSAGES_SUCCESS, message: response.data })
        } catch (error) {
            console.log(error);
            dispatch({ type: SEND_MESSAGES_FAILURE, error: error.message })
        }
    }
}

export const fetchChatByProjectId = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST })
        try {
            const response = await api.get(`/api/projects/${projectId}/chat`)
            dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data })
        } catch (error) {
            console.log(error);
            dispatch({ type: FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message })
        }
    }
}

export const fetchChatMessages = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST })
        try {
            const response = await api.get(`/api/messages/project/` + projectId)
            console.log(response);
            dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, messages: response.data })
        } catch (error) {
            console.log(error);
            dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, error: error.message })
        }
    }
}