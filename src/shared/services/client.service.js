import instance from "./instanceAxios";

class ClientService {

    path = '/clients';

    getAll() {
        return instance.get(`${this.path}`);
    }

    get(id) {
        return instance.get(`${this.path}/${id}`);
    }

    getByUser(userId) {
        return instance.get(`${this.path}/users/${userId}`);
    }

    create(data) {
        console.log(data);
        return instance.post(`${this.path}`, data);
    }

    update(id, data) {
        return instance.put(`${this.path}/${id}`, data);
    }

    delete(id) {
        return instance.delete(`${this.path}/${id}`);
    }
    
}

export default new ClientService();