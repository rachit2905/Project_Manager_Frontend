import { API_BASE_URL } from "@/config/api";
import {
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from "./ActionType";
import axios from "axios";

export const register = userData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        }
        console.log("Register Success", data);
    } catch (error) {
        console.error("Register Error", error);
        dispatch({ type: REGISTER_FAILURE, error: error.message });
    }
}

export const login = userData => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        }
        console.log("Login Success", data);
    } catch (error) {
        console.error("Login Error", error);
        dispatch({ type: LOGIN_FAILURE, error: error.message });
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        if (data) {

            console.log(data);
            dispatch({ type: GET_USER_SUCCESS, payload: data });
        }
        console.log("Get User Success", data);
    } catch (error) {
        console.error("Get User Error", error);
        dispatch({ type: GET_USER_FAILURE, error: error.message });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
}
