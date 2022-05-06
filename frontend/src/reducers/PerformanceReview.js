function trainingTaskReducer(state = {taskList:[], sentList: []}, action){
    switch(action.type){
    case "GETPERFORMANCEREVIEW":
        return {...state, taskList: action.payload.tasks.received, sentList: action.payload.tasks.sent};
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

export default trainingTaskReducer;
