import instance from "./instanceAxios";

class ClientService {

    path = '/clients';

    getAll() {
        let limit = 100;
        let nbPage = 0;
        let sort = 'firstname';
        let sortOrder = 'ASC';
        return instance.get(`${this.path}?limit=${limit}&nbPage=${nbPage}&sort=${sort}&sortOrder=${sortOrder}`);
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