import http from "../http-common";


class ClientWishService {

    path = '/clientWhishes';

    get(id) {
        return http.get(`${this.path}/${id}`, { headers: authHeader() });
    }

    getByClient(clientId) {
        return http.get(`${this.path}/clients/${clientId}`, { headers: authHeader() });
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

export default new ClientWishService();