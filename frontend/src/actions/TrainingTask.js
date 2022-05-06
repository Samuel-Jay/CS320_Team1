import * as taskAPI from "../api/TrainingTask.js";

export const createTrainingTask = (formData) => async() => {
    try{
        await taskAPI.createTrainingTask(formData);
    }catch(err){
        console.log(err);
    }
};

export const getTrainingTask = () => async(dispatch) => {
    try{
        console.log("running")
        const {data} = await taskAPI.getTrainingTask();
        console.log(data)
        dispatch({type: "GETTRAININGTASK", payload: data});
    }catch(err){
        console.log(err);
    }
};
