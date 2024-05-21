import api from "@/config/api";
import {
    UPGRADE_USER_SUBSCRIPTION_REQUEST, UPGRADE_USER_SUBSCRIPTION_SUCCESS, UPGRADE_USER_SUBSCRIPTION_FAILURE,
    GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, GET_USER_SUBSCRIPTION_FAILURE
} from "./ActionTypes";

// Upgrade user subscription
export const upgradeUserSubscription = ({ planType, userId }) => async (dispatch) => {
    dispatch({ type: UPGRADE_USER_SUBSCRIPTION_REQUEST });
    try {
        const { data } = await api.post(`/api/subscriptions/upgrade/${userId}?planType=` + planType);
        console.log("Upgraded user subscription", data);
        dispatch({ type: UPGRADE_USER_SUBSCRIPTION_SUCCESS, subscription: data });
    } catch (error) {
        console.error("Upgrade user subscription error", error);
        dispatch({ type: UPGRADE_USER_SUBSCRIPTION_FAILURE, error: error.message });
    }
}

// Get user subscription
export const getUserSubscription = (userId) => async (dispatch) => {
    dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST });
    try {
        const { data } = await api.get(`/api/subscriptions/${userId}`);
        console.log("Fetched user subscription", data);
        dispatch({ type: GET_USER_SUBSCRIPTION_SUCCESS, subscription: data });
    } catch (error) {
        console.error("Get user subscription error", error);
        dispatch({ type: GET_USER_SUBSCRIPTION_FAILURE, error: error.message });
    }
}
