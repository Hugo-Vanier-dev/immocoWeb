import http from "../http-common";


class ShutterTypeService {

    path = '/shutterTypes';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }
}

export default new ShutterTypeService();