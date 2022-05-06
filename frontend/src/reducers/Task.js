function taskReducer(state = {employees:[], openTask:null, query: "", type: "Training", status: "All", receive: "receive"}, action){
    switch(action.type){
    case "OPENTASK":
        return { ...state,  openTask: action.payload};
    case "CLOSETASK":
        return { ...state, openTask: null};
    case "GETEMPLOYEE":
        localStorage.setItem("employees", JSON.stringify(action.payload.employees));
        return state;
    case "SEARCHTASK":
        return {...state, query: action.payload};
    case "CHANGETYPE":
        return {...state, type: action.payload};
    case "CHANGESTATUS":
        return {...state, status: action.payload};
    case "CHANGERECEIVE":
        return {...state, receive: action.payload};
    case "MOVETASK":
        const newTaskList = state.taskList.map(task => {
            if(state.selectTask.includes(task)){
                return {...task, status: action.payload}
                
            }else{
                return task
            }
        })
        return {...state, taskList: newTaskList}
    default:
        return state;
    }
}

export default taskReducer;
