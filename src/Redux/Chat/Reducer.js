import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGES_FAILURE, SEND_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ActionType";



const initialState = {
    messages: [],
    loading: false,
    error: null,
    chat: null
}

export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAT_BY_PROJECT_REQUEST:
        case FETCH_CHAT_MESSAGES_REQUEST:
        case SEND_MESSAGES_REQUEST:
            return {
                ...state, loading: true, error: null
            }
        case FETCH_CHAT_BY_PROJECT_REQUEST:
            return {
                ...state, chat: action.chat, loading: false
            }
        case SEND_MESSAGES_SUCCESS:
            return {
                ...state, loading: false, messages: [...state.messages, action.messages]
            }
        case FETCH_CHAT_MESSAGES_SUCCESS:
            return {
                ...state, loading: false, messages: action.messages
            }
        case SEND_MESSAGES_FAILURE:
        case FETCH_CHAT_BY_PROJECT_FAILURE:
        case FETCH_CHAT_MESSAGES_FAILURE:
            return {
                ...state, loading: false, error: action.error
            }

        default:
            return state;
    }
}