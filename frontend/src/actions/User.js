import * as userAPI from "../api/User.js";


export const signin =  (user)=> async (dispatch) => {
    try{
        const {data} = await userAPI.login(user);
        dispatch({type: "LOGIN", payload: data});
    }catch(err){
        console.log(err);
    }
};

export const signout = ()=> async(dispatch) => {
    try{
        console.log("sign out");
        dispatch({type: "LOGOUT", payload: {}});
    }catch(err){
        console.log(err);
    }
    
};
