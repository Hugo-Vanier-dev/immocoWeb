import http from "../http-common";
import GestionRetour from './class/gestionRetour';
import authHeader from './methode/auth-header';

class ClientService extends GestionRetour  {

    path = '/clients';

    getAll() {
        const promise = http.get(`${this.path}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    get(id) {
        const promise = http.get(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    getByUser(userId) {
        const promise = http.get(`${this.path}/users/${userId}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    create(data) {
        const promise = http.post(`${this.path}`, data, { headers: authHeader() });
        return this.postGestion(promise);
    }

    update(id, data) {
        const promise = http.put(`${this.path}/${id}`, data, { headers: authHeader() });
        return this.putGestion(promise);
    }

    delete(id) {
        const promise = http.delete(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }
    
}

export default new ClientService();