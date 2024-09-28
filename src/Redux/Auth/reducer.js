
import { CURRENT_USER_FAILURE, CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./actionTypes"

const initialState = {
    loading: false,
    signup: null,
    login:null,
    reqUser:null,
    error: null,
    

}

export const authReducer = (state=initialState,action)=>{

      switch(action.type){

        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case CURRENT_USER_REQUEST:
          return {...state,loading:true}
          
          
       case REGISTER_USER_SUCCESS:   
              return {...state,loading:false,signup:action.payload,error:null}
       case LOGIN_USER_SUCCESS:   
              return {...state,loading:false,login:action.payload,error:null}
       case CURRENT_USER_SUCCESS:   
              return {...state,loading:false,reqUser:action.payload,error:null}


       case REGISTER_USER_FAILURE:
       case LOGIN_USER_FAILURE:
       case CURRENT_USER_FAILURE:
             return {...state,loading:false,error:action.payload} 


       default:
            return state




      }


}