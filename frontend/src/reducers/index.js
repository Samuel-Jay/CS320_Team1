import {combineReducers} from "redux";

import user from "./User.js";
import task from "./Task.js";
import TrainingTask from "./TrainingTask.js";
import PerformanceReview from "./PerformanceReview.js";
import PTO from "./PTO.js";
import Generic from "./Generic.js";
const reducers = combineReducers({user, task, TrainingTask, PerformanceReview, PTO, Generic});

export default reducers;
