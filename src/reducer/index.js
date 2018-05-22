import {combineReducers} from "redux";
import tasks from "./tasks";
import {selectedTask} from "./select-task";

const allReducers = combineReducers({
    tasks:tasks,
    selectedTask:selectedTask
});

export default allReducers;