import {combineReducers} from "redux";
import tasks from "./tasks";

const allReducers = combineReducers({
    tasks:tasks
});

export default allReducers;