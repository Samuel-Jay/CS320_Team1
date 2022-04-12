import {combineReducers} from "redux";

import user from "./User.js";
import task from "./Task.js";
const reducers = combineReducers({user, task});

export default reducers;
