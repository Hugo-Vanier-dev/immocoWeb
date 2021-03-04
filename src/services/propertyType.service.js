import http from "../http-common";


class PropertyTypeService {

    path = '/propertyTypes';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }
}

export default new PropertyTypeService();