import * as taskAPI from "../api/PTO.js";

export const createPTO = (formData) => async() => {
    try{
        await taskAPI.createPTO(formData);
    }catch(err){
        console.log(err);
    }
};

export const getPTO = () => async(dispatch) => {
    try{
        console.log("running")
        const {data} = await taskAPI.getPTO();
        console.log(data)
        dispatch({type: "GETPTO", payload: data});
    }catch(err){
        console.log(err);
    }
};
