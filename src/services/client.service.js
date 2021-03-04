import http from "../http-common";


class ClientService {

    path = '/clients';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }

    get(id) {
        return http.get(`${this.path}/${id}`, { headers: authHeader() });
    }

    getByUser(userId) {
        return http.get(`${this.path}/users/${userId}`, { headers: authHeader() });
    }

    create(data) {
        return http.post(`${this.path}`, data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`${this.path}/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete(`${this.path}/${id}`, { headers: authHeader() });
    }
    
}

export default new ClientService();