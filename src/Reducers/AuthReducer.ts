
const UsersListReducer = (user = [], action: any) => {
    switch (action.type) {
        case "GET_USERS": {
            const data = action.user.data;
            return data;
        }
        case "DELETE_USER": {
            const newDeletedForm = user.filter((item, index) => item.id !== action.id);
            return newDeletedForm;
        }
        default:
            return user;
    }
};

const CurrentUserReducer = (user = null, action: any) => {
    switch (action.type) {
        case "GET_USERS": {
            const data = action.user.data;
            return data;
        }
        case "POST_AUTH": {
            const data = action.user.data;
            return data;
        }
        default:
            return user;
    }
};


export {
    UsersListReducer,
    CurrentUserReducer
};
