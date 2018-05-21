import {ADD_TASK, UPDATE_STATUS} from "../constant/constant";

export const addTask= (task)=>{
    return {
        type:ADD_TASK,
        payload:task
    }
};

export const updateTask = (task)=>{
    return{
        type: UPDATE_STATUS,
        payload:task
    }
};