import * as userAPI from '../api/Task.js';
export const changeDisp =  ()=> async (dispatch) => {
	try{
		dispatch({type: 'GETTASK'})
	}catch(err){
		console.log(err)
	}
}
