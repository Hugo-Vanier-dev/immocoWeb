import http from "../http-common";


class ClientService {

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
        return http.get(`${this.path}`,
            {
                params: params,
                headers: authHeader()
            }
        );
    }

    get(id) {
        return http.get(`${this.path}/${id}`, { headers: authHeader() });
    }

    getByClient(clientId) {
        return http.get(`${this.path}/clients/${clientId}`, { headers: authHeader() });
    }

    getByClientWish(clientWishId) {
        return http.get(`${this.path}/clientsWishes/${clientWishId}`, { headers: authHeader() });
    }

    create(data) {
        return http.post(`${this.path}`, data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`${this.path}/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete(`${this.path}/${id}`, { headers: authHeader() });
    }
    
}

export default new ClientService();