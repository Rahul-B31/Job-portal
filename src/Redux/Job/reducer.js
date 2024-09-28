
import { CREATE_JOB_FAILUER, CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, FETCH_ALL_JOB_POSTS_FAILUER, FETCH_ALL_JOB_POSTS_REQUEST, FETCH_ALL_JOB_POSTS_SUCCESS, FETCH_JOB_BY_ID } from "./actionType"

const initialState = {
    loading: false,
    error:null,
    posts:null,
    post:null,
    applications:null, 

}

export const jobReducer = (state=initialState,actions)=>{

    switch(actions.type){
         case CREATE_JOB_REQUEST:
         case FETCH_ALL_JOB_POSTS_REQUEST:   
            return {...state,loading:true}

         case CREATE_JOB_SUCCESS:
         case FETCH_ALL_JOB_POSTS_SUCCESS:   
            return {...state,loading:false,error:null,posts:actions.payload}

         case FETCH_JOB_BY_ID:  
            return {...state,loading:false,error:null,post:actions.payload}   

        case CREATE_JOB_FAILUER:
        case FETCH_ALL_JOB_POSTS_FAILUER:   
            return {...state,loading:false,error:actions.payload} 
       default:
            return {...state};
               

    }

}
