const axios = require('axios');

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCrediantials: true,
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    }
})

//list of all the endpoints
export const register = (data) => api.post('/api/register', data);
export const loggin = (data) => api.post('/api/login', data);
export const getProducts = (data) => api.get('/api/products', data);

export default api;