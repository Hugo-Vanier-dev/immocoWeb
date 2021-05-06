import axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:8000/api`,
    headers: {
        "Content-type": "application/json"
    }
});

instance.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;