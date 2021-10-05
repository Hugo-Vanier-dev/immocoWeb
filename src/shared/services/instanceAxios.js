import axios from "axios";
import authService from "./auth.service";

const instance = axios.create({
    baseURL: `https://fierce-cove-97875.herokuapp.com/api`,
    timeout: 10000
});


function setRefreshTime(tokenLifeTimeMinutes) {
    localStorage.setItem('refresh', JSON.stringify(Date.now() + tokenLifeTimeMinutes / 2 * 60 * 1000));
}

function setExpireTime(tokenLifeTimeMinutes) {
    localStorage.setItem('tokenLifetime', JSON.stringify(Date.now() + tokenLifeTimeMinutes * 60 * 1000));
}

instance.interceptors.request.use(function (config) {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
        if (!JSON.parse(localStorage.getItem('refresh'))) {
            setRefreshTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in));
        }
        if(!JSON.parse(localStorage.getItem('tokenLifetime'))){
            setExpireTime(parseInt(JSON.parse(localStorage.getItem('token')).expires_in));
        }
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (config) {
    if (Date.now() > parseInt(JSON.parse(localStorage.getItem('refresh'))) && Date.now() < parseInt(JSON.parse(localStorage.getItem('tokenLifetime')))) {
        authService.refresh().then(res => {
            localStorage.setItem('token', JSON.stringify(res.data));
            const refreshedToken = res.data;
            if (refreshedToken) {
                setRefreshTime(parseInt(refreshedToken.expires_in));
                setExpireTime(parseInt(refreshedToken.expires_in));
            }
        });
    }else if(Date.now() > parseInt(JSON.parse(localStorage.getItem('tokenLifetime')))) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('tokenLifetime');
        window.location.reload();
    }
    return config;
}, function (error) {
    if (Date.now() > parseInt(JSON.parse(localStorage.getItem('refresh'))) && Date.now() < parseInt(JSON.parse(localStorage.getItem('tokenLifetime')))) {
        authService.refresh().then(res => {
            localStorage.setItem('token', JSON.stringify(res.data));
            const refreshedToken = res.data;
            if (refreshedToken) {
                setRefreshTime(parseInt(refreshedToken.expires_in));
                setExpireTime(parseInt(refreshedToken.expires_in));
            }
        });
    }else if(Date.now() > parseInt(JSON.parse(localStorage.getItem('tokenLifetime')))) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('tokenLifetime');
        window.location.reload();
    }
    return Promise.reject(error);
})

export { setRefreshTime };

export default instance;