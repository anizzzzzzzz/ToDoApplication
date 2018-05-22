import {ADD_TASK, SELECT_TASK, UPDATE_STATUS} from "../constant/constant";

export const addTask= (task)=>{
    return {
        type:ADD_TASK,
        payload:task
    }
};

export const updateStatus = (task)=>{
    return{
        type: UPDATE_STATUS,
        payload:task
    }
};

export const selectTask = (task)=>{
    return{
        type: SELECT_TASK,
        payload:task
    }
};
