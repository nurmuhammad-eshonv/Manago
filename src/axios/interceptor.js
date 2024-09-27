import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://trello.vimlc.uz/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor for adding the token automatically
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
