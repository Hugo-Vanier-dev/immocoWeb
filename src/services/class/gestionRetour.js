class GestionRetour {

    getDeleteGestion(promise){
        return promise.then((data) => {
            if(data.status === 200){
                return data;
            }
        }          
        ).catch((error) => {
            let errorMessage = {
                message: error.response.data,
                status: error.response.status
            };
            return errorMessage;
        })
    }

    postGestion(promise){
        return promise.then((data) => {
            if(data.status === 200){
                return data;
            }
        }          
        ).catch((error) => {
            let errorMessage = {
                message: error.response.data,
                status: error.response.status
            };
            return errorMessage;
        })
    }

    putGestion(promise){
        return promise.then((data) => {
            if(data.status === 200){
                return data;
            }
        }          
        ).catch((error) => {
            let errorMessage = {
                message: error.response.data,
                status: error.response.status
            };
            return errorMessage;
        })
    }

}

export default GestionRetour
