function taskReducer(state = {taskList:[], sentList: [],employees:[],openTask:null, category:"UNCOMPLETE"}, action){
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
        return { ...state,  openTask: null};
    case "GETEMPLOYEE":
        localStorage.setItem("employees", JSON.stringify(action.payload.employees));
        return state;
    case "GETTASK":
        return {...state, taskList: action.payload.received, sentList: action.payload.sent};
    default:
        return state;
    }
}

export default taskReducer;
