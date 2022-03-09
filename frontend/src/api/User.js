import axios from 'axios';

let url = "http://localhost:5000/api"

export const login = (user) => axios.post(url + "/login", user);
