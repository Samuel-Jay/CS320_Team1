import * as userAPI from '../api/User.js';


export const signin =  (user, navigate)=> async (dispatch) => {
    try{
	const {data} = await userAPI.login(user);
        console.log(data)
	dispatch({type: 'LOGIN', payload: data});
	navigate()("/")
    }catch(err){
        console.log(err)
    }
}

export const signout = ()=> async(dispatch) => {
    try{
	console.log("sign out")
	dispatch({type: 'LOGOUT', payload: {}});
    }catch(err){
	console.log(err)
    }
    
}
