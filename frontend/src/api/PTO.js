import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5001/user" });


export const createPTO = (formData) => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.post("/pto/create", formData, {params: {secret_token: token}});   
};

export const getPTO = () => {
    const {token} = JSON.parse(localStorage.getItem("profile"));
    return instance.get("/pto/get", {params: {secret_token: token}});   
};
