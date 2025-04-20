import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import {
	MainLoadingReducer,
	SaveReducer,
} from "./LoadingReducer";
import { CurrentFormReducer, FormListReducer, PostListReducer } from "./FormReducer";
import { CurrentUserReducer, UsersListReducer } from "./AuthReducer";


const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history), // состояние роутера


		authUser: CurrentUserReducer,
		usersList: UsersListReducer,

		mainLoader: MainLoadingReducer,
		saveMoment: SaveReducer,

		postList: PostListReducer,

		formList: FormListReducer,
		currentForm: CurrentFormReducer,
	});

export default createRootReducer;
