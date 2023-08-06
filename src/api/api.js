import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const token = JSON.parse(localStorage.getItem('token'));

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default api;
