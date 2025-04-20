const MainLoadingReducer = (state = 0, action) => {
	switch (action.type) {
		case "SHOW_MAIN_LOADER":
			return (state = state + 1);
		case "HIDE_MAIN_LOADER":
			return (state = state - 1);
		default:
			return state;
	}
};

const SaveReducer = (state = false, action) => {
	switch (action.type) {
		case "SHOW_SAVE_INFO":
			return true;
		case "HIDE_SAVE_INFO":
			return false;
		default:
			return state;
	}
};

export { SaveReducer, MainLoadingReducer };
