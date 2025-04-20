import axios from "axios";
import { baseUrl } from "./actions-static";
import { IForm } from "../components/FormPage/interfaces";


export const getPosts = () => {
	return async (dispatch) => {
		dispatch({
			type: "SHOW_MAIN_LOADER",
		});
		await axios
			.get(`${baseUrl}/api/posts`)
			.then((form) => {
				dispatch({
					type: "GET_POSTS",
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