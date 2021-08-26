import instance from "./instanceAxios";

class PropertyService {

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
        return instance.get(`${this.path}`, {params: params});
    }

    get(id) {
        return instance.get(`${this.path}/${id}`);
    }

    getByProperty(propertyId) {
        return instance.get(`${this.path}/propertys/${propertyId}`);
    }

    getByPropertyWish(propertyWishId) {
        return instance.get(`${this.path}/propertysWishes/${propertyWishId}`);
    }

    create(data) {
        return instance.post(`${this.path}`, data);
    }

    update(id, data) {
        return instance.put(`${this.path}/${id}`, data);
    }

    delete(id) {
        return instance.delete(`${this.path}/${id}`);
    }
    
}

export default new PropertyService();