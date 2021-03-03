import http from "../http-common";


class AppointmentTypeService {

    path = '/appointmentTypes';

    getAll() {
        return http.get(`${this.path}`, { headers: authHeader() });
    }
}

export default new AppointmentTypeService();