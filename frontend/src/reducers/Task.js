const usersDefaultState = [];
function taskReducer(state = {taskList:[], sentList: [],employees:[], selectTask: [],openTask:null, query: "", category:"UNCOMPLETE"}, action){
    switch(action.type){
    case "UNCOMPLETE":
        return { ...state, category:"UNCOMPLETE"};
    case "COMPLETE":
        return { ...state, category:"COMPLETE"};
    case "FAILED":
        return { ...state, category:"ARCHIVE"};
    case "OPENTASK":
        return { ...state,  openTask: action.payload};
    case "CLOSETASK":
        return {usersDefaultState};
    case "GETEMPLOYEE":
        localStorage.setItem("employees", JSON.stringify(action.payload.employees));
        return state;
    case "GETTASK":
        return {...state, taskList: action.payload.tasks.received, sentList: action.payload.tasks.sent};
    case "SEARCHTASK":
        return {...state, query: action.payload};
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

export default taskReducer;
