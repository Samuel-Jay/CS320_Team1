import * as taskAPI from "../api/Task.js";

export const changeDisp =  (task)=> async (dispatch) => {
    try{
        dispatch({type: "OPENTASK", payload: task});
    }catch(err){
        console.log(err);
    }
};

export const incomplete =  ()=> async (dispatch) => {
    try{
        dispatch({type: "UNCOMPLETE"});
    }catch(err){
        console.log(err);
    }
};
export const complete =  ()=> async (dispatch) => {
    try{
        dispatch({type: "COMPLETE"});
    }catch(err){
        console.log(err);
    }
};
export const archive =  ()=> async (dispatch) => {
    try{
        dispatch({type: "ARCHIVE"});
    }catch(err){
        console.log(err);
    }
};

export const getEmployees  = () => async(dispatch) => {
    try{
        const {data} = await taskAPI.getEmployees();
        dispatch({type: "GETEMPLOYEE", payload: data});
    }catch(err){
        console.log(err);
    }
};

export const createTrainingTask = (formData) => async() => {
    try{
        await taskAPI.createTrainingTask(formData);
    }catch(err){
        console.log(err);
    }
};

export const getTrainingTask = () => async(dispatch) => {
    try{
        const {email} = JSON.parse(localStorage.getItem("profile")).user;
        const {data} = await taskAPI.getTrainingTask({requestorEmail : email});
        dispatch({type: "GETTASK", payload: data});
    }catch(err){
        console.log(err);
    }
};
