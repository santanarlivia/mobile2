import axios from 'axios';

const api = axios.create({
    baseURL: '	https://api.adviceslip.com/advice/{slip_id}'
});

export default api;