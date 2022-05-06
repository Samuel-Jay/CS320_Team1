import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5001/user" });


export const createPerformanceReview = (formData) => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.post("/performanceReview/create", formData, {params: {secret_token: token}});   
};

export const getPerformanceReview = () => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.get("/performancereview/get", {params: {secret_token: token}});   
};

export const getEmployees = () => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.get("/performanceReview/employee", {params: {secret_token: token}});   
};
