import axios from "axios";
import { baseUrl } from "./actions-static";
import { IForm } from "../components/FormPage/interfaces";

export const getFormList = () => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_MAIN_LOADER",
		});
		await axios
			.get(`${baseUrl}/api/form`)
			.then((form) => {
				dispatch({
					type: "GET_FORM_LIST",
					form,
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

export const getCurrentForm = (id: number) => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_MAIN_LOADER",
		});
		await axios
			.get(`${baseUrl}/api/form/${id}`)
			.then((form) => {
				dispatch({
					type: "GET_CURRENT_FORM",
					form,
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
export const createForm = (data: IForm) => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_MAIN_LOADER",
		});
		await axios
			.post(`${baseUrl}/api/form`, data)
			.then((form) => {
				dispatch({
					type: "POST_FORM",
					form,
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

export const updateForm = (id: number, data: IForm) => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_MAIN_LOADER",
		});
		await axios
			.put(`${baseUrl}/api/form/${id}`, data)
			.then((form) => {
				dispatch({
					type: "PUT_FORM",
					form,
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

export const deleteForm = (id) => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_MAIN_LOADER",
		});
		await axios
			.delete(`${baseUrl}/api/form/${id}`)
			.then((form) => {
				dispatch({
					type: "DELETE_FORM",
					id,
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
