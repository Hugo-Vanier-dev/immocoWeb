import http from "../http-common";


class ClientTypeService {

    path = '/clientTypes';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }
}

export default new ClientTypeService();