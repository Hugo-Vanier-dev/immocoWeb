import axios from "axios";
import authService from "./auth.service";

const instance = axios.create({
    baseURL: `https://fierce-cove-97875.herokuapp.com/api`,
    timeout: 1000
});

let refreshTime;

function setRefreshTime(tokenLifeTimeMinutes) {
    console.log(new Date(Date.now() + tokenLifeTimeMinutes / 2 * 60 * 1000));
    refreshTime = new Date(Date.now() + tokenLifeTimeMinutes / 2 * 60 * 1000);
}

instance.interceptors.request.use(function (config) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
        if (!refreshTime) {
            setRefreshTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in));
        }
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (config) {
    if (new Date() > refreshTime) {
        authService.refresh().then(res => {
            console.log(res)
            localStorage.setItem('token', res.data)
            const refreshedToken = res.data;
            if (refreshedToken) {
                console.log('bien joué bg');
                setRefreshTime(refreshedToken.expires_in);
            }
        });

    }
    return config;
}, function (error) {
    /*if (error && error.response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    }*/
    return Promise.reject(error);
})

export { setRefreshTime };

export default instance;