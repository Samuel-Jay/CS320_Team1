import axios from 'axios';

let url = "http://localhost:5000/api"

export const getTask = () => axios.post(url + "/task", task);