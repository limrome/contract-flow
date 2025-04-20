import { IForm } from "../components/FormPage/interfaces";

const FormListReducer = (form = [], action: { type: any; form: { data: IForm; id: any; published: any; }; id: number; }) => {
    switch (action.type) {
        case "GET_FORM_LIST": {
            const data = action.form.data;
            return data;
        }

        case "PUT_FORM": {
            const data = action.form.data;
            const newForm = form.map((item, index) =>
                item.id === action.form.id ? data : item
            )
            return newForm;
        }
        case "POST_FORM": {
            const data = action.form.data;
            const newForm = [...form];
            newForm.push(data);
            return newForm;
        }
        case "DELETE_FORM": {
            const newDeletedForm = form.filter((item, index) => item.id !== action.id);
            return newDeletedForm;
        }
        default:
            return form;
    }
};
const PostListReducer = (post = [], action: any) => {
    switch (action.type) {
        case "GET_POSTS": {
            const data = action.form.data;
            return data;
        }
        default:
            return post;
    }
};

const CurrentFormReducer = (form = {}, action: { type: any; form: { data: IForm | IForm[]; id: any; published: any; }; id: number; }) => {
    switch (action.type) {
        case "GET_CURRENT_FORM": {
            const data = action.form.data;
            return data;
        }
        case "PUT_FORM": {
            const data = action.form.data;
            return data;
        }
        case "POST_FORM": {
            const data = action.form.data;
            return data;
        }
        default:
            return form;
    }
};


export {
    FormListReducer,
    PostListReducer,
    CurrentFormReducer
};
