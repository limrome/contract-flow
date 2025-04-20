import axios from "axios";
import { baseUrl } from "./actions-static";

export const postAuth = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_MAIN_LOADER",
        });
        await axios
            .post(`${baseUrl}/api/user/auth`, data)
            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user.data))
                dispatch({
                    type: "POST_AUTH",
                    user,
                });
            })
            .finally(() => {
                dispatch({
                    type: "HIDE_MAIN_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
export const postRegister = (data) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_MAIN_LOADER",
        });
        await axios
            .post(`${baseUrl}/api/user/register`, data)
            .then((user) => {
                dispatch({
                    type: "POST_REGISTER",
                    user,
                });
            })
            .finally(() => {
                dispatch({
                    type: "HIDE_MAIN_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
export const getUser = (id) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_MAIN_LOADER",
        });
        await axios
            .get(`${baseUrl}/api/user/${id}`)
            .then((user) => {
                dispatch({
                    type: "GET_USER",
                    user,
                });
            })
            .finally(() => {
                dispatch({
                    type: "HIDE_MAIN_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
export const getUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_MAIN_LOADER",
        });
        await axios
            .get(`${baseUrl}/api/users`)
            .then((user) => {
                dispatch({
                    type: "GET_USERS",
                    user,
                });
            })
            .finally(() => {
                dispatch({
                    type: "HIDE_MAIN_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
export const deleteUser = (id) => {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_MAIN_LOADER",
        });
        await axios
            .delete(`${baseUrl}/api/user/id`)
            .then((user) => {
                dispatch({
                    type: "DELETE_USER",
                    user,
                });
            })
            .finally(() => {
                dispatch({
                    type: "HIDE_MAIN_LOADER",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

