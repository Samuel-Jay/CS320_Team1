function userReducer(state = {userData : null, hasFailed : true}, action){
	switch(action.type){
	case "LOGIN":
		localStorage.setItem('profile', JSON.stringify({...action.payload.data}));
		return { ...state, authData: action.data, hasFailed: false};
	case "LOGOUT":
		localStorage.clear()
		return { ...state, authData: null, hasFailed: false};
	case "FAILED":
		return { ...state, authData: null, hasFailed: true};
	default:
		return state;
	}

}

export default userReducer
