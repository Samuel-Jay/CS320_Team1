import * as userAPI from '../api/Task.js';
export const changeDisp =  (task)=> async (dispatch) => {
	try{
		dispatch({type: 'GETTASK', payload: task})
	}catch(err){
		console.log(err)
	}
}

export const incomplete =  ()=> async (dispatch) => {
	try{
		dispatch({type: 'UNCOMPLETE'})
	}catch(err){
		console.log(err)
	}
}
export const complete =  ()=> async (dispatch) => {
	try{
		dispatch({type: 'COMPLETE'})
	}catch(err){
		console.log(err)
	}
}
export const archive =  ()=> async (dispatch) => {
	try{
		dispatch({type: 'ARCHIVE'})
	}catch(err){
		console.log(err)
	}
}
