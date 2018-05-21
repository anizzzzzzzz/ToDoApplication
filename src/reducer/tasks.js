import {ADD_TASK, UPDATE_STATUS} from "../constant/constant";

const tasks = (state=[], action)=>{
    switch (action.type){
        case ADD_TASK:
            return [...state,Object.assign({},action.payload)];
        case UPDATE_STATUS:
            return action.payload;
        default:
            return state;
    }
};

export default tasks;