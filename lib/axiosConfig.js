import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://fundacioncc-api-a3535c351ac4.herokuapp.com',
    headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
    }
})

axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Accept'] = '*/*';

// axiosInstance.defaults.headers.common['User-Agent'] ="*";
export default axiosInstance;