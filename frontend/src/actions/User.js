import * as userAPI from '../api/User.js';


export const signin =  (user, navigate)=> async (dispatch) => {
	try{
		const {data} = await userAPI.login(user);
		if(data.isAuth){
			dispatch({type: 'LOGIN', payload: data});
			navigate()("/")
		}else{
			dispatch({type: 'FAILED', payload: data});
			navigate()("/login")
		}
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
