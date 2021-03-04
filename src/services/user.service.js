import http from "../http-common";
import authHeader from './methode/auth-header';
import GestionRetour from './class/gestionRetour';


class UserService extends GestionRetour {

    path = '/users';

    login(data) {
        return http.post(`${this.path}/login`, data)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        return http.get(`${this.path}/logout`, { headers: authHeader() }).then(() => localStorage.removeItem('user'));
    }

    getAll() {
        const promise = http.get(`${this.path}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    get(id) {
        const promise = http.get(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    create(data) {
        const promise = http.post(`${this.path}`, data, { headers: authHeader() });
        return this.postGestion(promise);
    }

    update(id, data) {
        const promise = http.put(`${this.path}/${id}`, data,{ headers: authHeader() });
        return this.putGestion(promise);
    }

    delete(id) {
        const promise = http.delete(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }
    
}

export default new UserService();