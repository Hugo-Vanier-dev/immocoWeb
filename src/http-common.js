import axios from "axios";

let http;
if(process.env.NODE_ENV === 'development'){
    http = axios.create({
        baseURL: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_PREFIX_API}`,
        headers: {
            "Content-type": "application/json"
        }
    });
}else{
    http = axios.create({
        baseURL: `https://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_PREFIX_API}`,
        headers: {
            "Content-type": "application/json"
        }
    });
}
export default http;