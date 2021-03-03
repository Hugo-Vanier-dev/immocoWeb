import http from "../http-common";


class HeaterTypeService {

    path = '/heaterTypes';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }
}

export default new HeaterTypeService();