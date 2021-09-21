import axios from "axios";
import authService from "./auth.service";

const instance = axios.create({
    baseURL: `https://fierce-cove-97875.herokuapp.com/api`,
    timeout: 1000
});

let refreshTime;
let expiresTime;

function setRefreshTime(tokenLifeTimeMinutes) {
    refreshTime = new Date(Date.now() + tokenLifeTimeMinutes / 2 * 60 * 1000);
}

function setExpiresTime(tokenLifeTimeMinutes){
    expiresTime = new Date(Date.now() + tokenLifeTimeMinutes * 60 * 1000);
}

instance.interceptors.request.use(function (config) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
        if (!refreshTime) {
            setRefreshTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in));
        }
        if(!expiresTime){
            setExpiresTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in))
        }
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (config) {
    if(refreshTime && expiresTime){
        if (new Date() > refreshTime && new Date() < expiresTime) {
            authService.refresh().then(res => {
                localStorage.setItem('token', JSON.stringify(res.data))
                const refreshedToken = res.data;
                if (refreshedToken) {
                    setRefreshTime(refreshedToken.expires_in);
                    setExpiresTime(refreshedToken.expires_in);
                }
            });
        }else if (new Date() > expiresTime){
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.reload();
        }
    }
    
    return config;
}, function (error) {
    return Promise.reject(error);
})

export { setRefreshTime };

export default instance;