
import { GET_ALL_COMPANIES_FAILUER, GET_ALL_COMPANIES_REQUEST, GET_ALL_COMPANIES_SUCCESS, REGISTER_COMPANY_FAILUER, REGISTER_COMPANY_REQUEST, REGISTER_COMPANY_SUCCESS } from "./actionTypes"

const initialState = {
    loading: false,
    error:null,
    companydata:null 

}

export const companyReducer = (state=initialState,actions)=>{

    switch(actions.type){

        case REGISTER_COMPANY_REQUEST:
        case GET_ALL_COMPANIES_REQUEST:
            return {...state,loading:true}

        case REGISTER_COMPANY_SUCCESS:
        case GET_ALL_COMPANIES_SUCCESS:      
            return {...state,loading:false,companydata:actions.payload,error:null}

            

        case REGISTER_COMPANY_FAILUER:
        case GET_ALL_COMPANIES_FAILUER:    
            return {...state,loading:false,error:actions.payload}

        default:
            return state;    
    }


}