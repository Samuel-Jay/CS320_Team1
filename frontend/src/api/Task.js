import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:5001/user' });


export const getEmployees = () => {
    const {user, token} = JSON.parse(localStorage.getItem('profile'))
    return instance.post('/employees/get', {email: user.email, employeeId: user.employeeId}, { params: {secret_token: token}});   
}
export const createTrainingTask = (formData) => {
    const {token} = JSON.parse(localStorage.getItem('profile'))
    return instance.post('/TrainingTask/create', formData, {params: {secret_token: token}});   
}

export const getTrainingTask = (formData) => {
    const {token} = JSON.parse(localStorage.getItem('profile'))
    return instance.post('/TrainingTask/get', formData, {params: {secret_token: token}});   
}
