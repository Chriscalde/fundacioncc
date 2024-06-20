import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://hnouee5av8.execute-api.us-east-1.amazonaws.com/stage3',
    headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'image/jpeg'
    }
})

// axiosInstance.defaults.headers.put['Content-Type'] = 'image/jpeg';
axiosInstance.defaults.headers.common['Accept'] = '*/*';

// axiosInstance.defaults.headers.common['User-Agent'] ="*";
export default axiosInstance;