function trainingTaskReducer(state = {taskList:[], sentList: [], selectTask: []}, action){
    switch(action.type){
    case "GETTRAININGTASK":
        return {...state, taskList: action.payload.tasks.received, sentList: action.payload.tasks.created};
    case "SELECTTASK":
        if (state.selectTask.includes(action.payload)){
            return {...state, selectTask: state.selectTask.filter(task => task !== action.payload) }
        }else{
            return {...state, selectTask: [...state.selectTask, action.payload]}
        }
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
