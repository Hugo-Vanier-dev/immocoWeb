import axios from "axios";
const dotenv = require('dotenv');
dotenv.config();

if(process.env.NODE_ENV === 'development'){
    export default axios.create({
        baseURL: `http://${process.env.HOST}:${process.env.PORT}/${process.env.PREFIX_API}`,
        headers: {
            "Content-type": "application/json"
        }
    });
}else{
    export default axios.create({
        baseURL: `https://${process.env.HOST}:${process.env.PORT}/${process.env.PREFIX_API}`,
        headers: {
            "Content-type": "application/json"
        }
    });
}
