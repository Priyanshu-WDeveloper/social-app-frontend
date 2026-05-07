import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',

  withCredentials: true,
});
