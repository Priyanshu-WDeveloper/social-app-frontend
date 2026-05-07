import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:5000',
  withCredentials: true,
});
