function trainingTaskReducer(state = {taskList:[], sentList: [], employees: []}, action){
    switch(action.type){
    case "GETEMPLOYEE":
        return {...state, employees: action.payload.result}
    case "GETPERFORMANCEREVIEW":
        return {...state, taskList: action.payload.tasks.received, sentList: action.payload.tasks.created};
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
