import {
    UPGRADE_USER_SUBSCRIPTION_REQUEST, UPGRADE_USER_SUBSCRIPTION_SUCCESS, UPGRADE_USER_SUBSCRIPTION_FAILURE,
    GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, GET_USER_SUBSCRIPTION_FAILURE
} from "./ActionTypes";

const initialState = {
    subscription: null,
    loading: false,
    error: null
};

export const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPGRADE_USER_SUBSCRIPTION_REQUEST:
        case GET_USER_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPGRADE_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state, loading: false, subscription: action.subscription, error: null
            };
        case GET_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state, loading: false, subscription: action.subscription, error: null
            };
        case UPGRADE_USER_SUBSCRIPTION_FAILURE:
        case GET_USER_SUBSCRIPTION_FAILURE:
            return {
                ...state, loading: false, error: action.error
            };
        default:
            return state;
    }
};
