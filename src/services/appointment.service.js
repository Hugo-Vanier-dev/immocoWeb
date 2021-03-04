import http from "../http-common";
import authHeader from './methode/auth-header';
import GestionRetour from './class/gestionRetour';

class AppointmentService extends GestionRetour {

    path = '/appointments';

    get(id) {
        const promise = http.get(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    getByUser(userId, dateStart, dateEnd) {
        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd
        }
        const promise = http.get(`${this.path}/users/${userId}`,
            {
                params: params,
                headers: authHeader()
            }
        );
        return this.getDeleteGestion(promise);
    }

    getByClient(clientId) {
        const promise = http.get(`${this.path}/clients/${clientId}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    create(data) {
        const promise = http.post(`${this.path}`, data, { headers: authHeader() });
        return this.postGestion(promise);
    }

    update(id, data) {
        const promise = http.put(`${this.path}/${id}`, data, { headers: authHeader() });
        return this.putGestion(promise);
    }

    delete(id) {
        const promise = http.delete(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }
    
}

export default new AppointmentService();