import {SELECT_TASK} from "../constant/constant";

export const selectedTask = (state =null, action)=>{
    switch (action.type){
        case SELECT_TASK:
            return action.payload;
        default:
            return state;
    }
};
