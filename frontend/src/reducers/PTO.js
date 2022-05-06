function PTOReducer(state = {taskList:[], sentList: []}, action){
    switch(action.type){
    case "GETPTO":
        return {...state, taskList: action.payload.ptoRequests.received, sentList: action.payload.ptoRequests.created};
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

export default PTOReducer;
