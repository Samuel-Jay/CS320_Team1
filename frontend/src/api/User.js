import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:5001' });
export const login = (formData) => instance.post('/api/login', formData);
