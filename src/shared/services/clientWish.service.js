import instance from "./instanceAxios";

class ClientWishService {

    path = '/clientWhishes';

    get(id) {
        return instance.get(`${this.path}/${id}`);
    }

    getByClient(clientId) {
        return instance.get(`${this.path}/clients/${clientId}`);
    }

    create(data) {
        return instance.post(`${this.path}`, data);
    }

    update(id, data) {
        return instance.put(`${this.path}/${id}`, data);
    }

    delete(id) {
        return instance.delete(`${this.path}/${id}`);
    }
    
}

export default new ClientWishService();