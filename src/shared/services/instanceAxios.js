import axios from "axios";
import authService from "./auth.service";

const instance = axios.create({
    baseURL: `https://fierce-cove-97875.herokuapp.com/api`,
    timeout: 1000
});

let refreshTime;

let tokenLifetime;

function setRefreshTime(tokenLifeTimeMinutes) {
    refreshTime = new Date(Date.now() + tokenLifeTimeMinutes / 2 * 60 * 1000);
}

function setExpireTime(tokenLifeTimeMinutes) {
    tokenLifetime = new Date(Date.now() + tokenLifeTimeMinutes * 60 * 1000);
}

instance.interceptors.request.use(function (config) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
        if (!refreshTime) {
            setRefreshTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in));
        }
        if(!tokenLifetime){
            setExpireTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in));
        }
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (config) {
    if (new Date() > refreshTime && new Date() < tokenLifetime) {
        authService.refresh().then(res => {
            localStorage.setItem('token', JSON.stringify(res.data));
            const refreshedToken = res.data;
            if (refreshedToken) {
                setRefreshTime(refreshedToken.expires_in);
                setExpireTime(refreshedToken.expires_in);
            }
        });
    }else if(new Date() > tokenLifetime) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})

export { setRefreshTime };

export default instance;