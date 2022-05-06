import * as taskAPI from "../api/PerformanceReview.js";

export const createPerformanceReview = (formData) => async() => {
    try{
        await taskAPI.createPerformanceReview(formData);
    }catch(err){
        console.log(err);
    }
};

export const getPerformanceReview = () => async(dispatch) => {
    try{
        console.log("running")
        const {data} = await taskAPI.getPerformanceReview();
        console.log(data)
        dispatch({type: "GETPERFORMANCEREVIEW", payload: data});
    }catch(err){
        console.log(err);
    }
};
