import http from "../http-common";
import GestionRetour from './class/gestionRetour';
import authHeader from './methode/auth-header';

class ClientService extends GestionRetour {

    path = '/properties';

    getAll(sort, sortOrder, limit, nbPage, filter=null) {
        const params = {
            sort: sort,
            sortOrder: sortOrder,
            limit: limit,
            nbPage: nbPage
        }
        if(filter != null){
            params.filter = filter
        }
        const promise = http.get(`${this.path}`,
            {
                params: params,
                headers: authHeader()
            }
        );
        return this.getDeleteGestion(promise);
    }

    get(id) {
        const promise = http.get(`${this.path}/${id}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    getByClient(clientId) {
        const promise = http.get(`${this.path}/clients/${clientId}`, { headers: authHeader() });
        return this.getDeleteGestion(promise);
    }

    getByClientWish(clientWishId) {
        const promise = http.get(`${this.path}/clientsWishes/${clientWishId}`, { headers: authHeader() });
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

export default new ClientService();