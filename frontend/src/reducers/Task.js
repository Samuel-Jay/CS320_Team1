const usersDefaultState = [];
  function taskReducer(state = {taskList:[], sentList: [],employees:[],openTask:null, query: "", category:"UNCOMPLETE"}, action){
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
        return {...state, taskList: action.payload.received, sentList: action.payload.sent};
    case "SEARCHTASK":
        return {...state, query: action.payload};
    default:
        return state;
    }
}

export default taskReducer;
