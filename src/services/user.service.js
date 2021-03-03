import http from "../http-common";


class UserService {

    path = '/users';

    login(data) {
        return http.post(`${this.path}/login`, data)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        return http.get(`${this.path}/logout`, { headers: authHeader() }).then(() => localStorage.removeItem('user'))
    }

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }

    get(id) {
        return http.get(`${this.path}/${id}`, { headers: authHeader() });
    }

    create(data) {
        return http.post(`${this.path}`, data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`${this.path}/${id}`, data,{ headers: authHeader() });
    }

    delete(id) {
        return http.delete(`${this.path}/${id}`, { headers: authHeader() });
    }
    
}

export default new UserService();