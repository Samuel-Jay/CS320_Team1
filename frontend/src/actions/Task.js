import * as taskAPI from "../api/Task.js";

export const getEmployees  = () => async(dispatch) => {
    try{
        const {data} = await taskAPI.getEmployees();
        dispatch({type: "GETEMPLOYEE", payload: data});
    }catch(err){
        console.log(err);
    }
};

export const openTask = (task) => async(dispatch) => {
    try{
        dispatch({type: "OPENTASK", payload: task})
    }catch(err){
        console.log(err);
    }
};

export const closeTask = () => async(dispatch) => {
    try{
        dispatch({type: "CLOSETASK", })
        console.log("yooooooooooo");
    }catch(err){
        console.log(err);
    }
};

export const searchTask = (query) => async(dispatch) => {
    try{
        dispatch({type: "SEARCHTASK", payload: query})
    }catch(err){
        console.log(err);
    }
};

export const selectTask = (task) => async(dispatch) => {
    try{
        dispatch({type: "SELECTTASK", payload: task})
    }catch(err){
        console.log(err);
    }
};

export const changeStatus = (newStatus) => async(dispatch) => {
    try {
        dispatch({type: "CHANGESTATUS", payload: newStatus})
    } catch (err) {
        
    }
}

export const changeType = (newType) => async(dispatch) => {
    try {
        console.log(newType)
        dispatch({type: "CHANGETYPE", payload: newType})
    } catch (err) {
        
    }
}

export const changeReceive = (newReceive) => async(dispatch) => {
    try {
        dispatch({type: "CHANGERECEIVE", payload: newReceive})
    } catch (err) {
        
    }
}

export const moveTask = () => {}
