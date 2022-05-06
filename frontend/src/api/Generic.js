import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5001/user" });


export const getEmployees = () => {
    const {user, token} = JSON.parse(localStorage.getItem("profile"));
    return instance.get("/employees/get", { params: {secret_token: token}});   
};
export const createTrainingTask = (formData) => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.post("/TrainingTask/create", formData, {params: {secret_token: token}});   
};

export const getTrainingTask = () => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.get("/trainingTask/get", {params: {secret_token: token}});   
};
