import http from "../http-common";


class UserTypeService {

    path = '/userTypes';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }
}

export default new UserTypeService();