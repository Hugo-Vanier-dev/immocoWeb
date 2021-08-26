import axios from "axios";

const instance = axios.create({
    baseURL: `https://fierce-cove-97875.herokuapp.com/api`,
    timeout: 1000
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

instance.interceptors.response.use(function (config) {
    console.log(config);
}, function(error) {
    console.log(error);
})

export default instance;