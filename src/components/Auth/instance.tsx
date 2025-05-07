import axios from "axios";

// Создание экземпляра axios
const instance = axios.create({
    baseURL: "http://localhost:8000/api/",
});

// Добавление интерсептора для добавления токенов в заголовки
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
