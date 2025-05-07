import TokenService from "./token.service.js";
import axios from "axios";

export const setupInterceptors = (store) => {
	axios.interceptors.request.use(
		(config) => {
			const token = TokenService.getLocalAccessToken();

			// const token = localStorage.getItem("token");
			if (token && config.ignoreGlobalCatch !== true) {
				config.headers["Content-Type"] = "application/json";
				config.headers["Authorization"] = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const originalConfig = err.config;
			console.log(err);
			if (err.response) {
				// Access Token was expired
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;
					TokenService.removeTokens();

				}
			}

			return Promise.reject(err);
		}
	);
};
