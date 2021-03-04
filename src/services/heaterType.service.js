import http from "../http-common";
import GestionRetour from './class/gestionRetour';
import authHeader from './methode/auth-header';


class HeaterTypeService extends GestionRetour {

    path = '/heaterTypes';

    getAll() {
        const promise = http.get(`${this.path}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }
}

export default new HeaterTypeService();