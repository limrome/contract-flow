

const getLocalAccessToken = () => {
	const access = localStorage.getItem("access");
	return access;
	// return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
	localStorage.setItem("access", token);
};

const getUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const removeTokens = () => {
	localStorage.removeItem("access");
};

const setUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
	localStorage.removeItem("user");
};

const TokenService = {
	getLocalAccessToken,
	updateLocalAccessToken,
	getUser,
	setUser,
	removeUser,
	removeTokens,
};

export default TokenService;
