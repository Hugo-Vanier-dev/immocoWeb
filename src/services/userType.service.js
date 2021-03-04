import http from "../http-common";
import authHeader from './methode/auth-header';
import GestionRetour from './class/gestionRetour';

class UserTypeService extends GestionRetour {

    path = '/userTypes';

    getAll() {
        const promise = http.get(`${this.path}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }
}

export default new UserTypeService();