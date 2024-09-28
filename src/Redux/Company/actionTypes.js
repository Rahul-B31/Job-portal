export const REGISTER_COMPANY_REQUEST = "REGISTER_COMPANY_REQUEST"
export const REGISTER_COMPANY_SUCCESS = "REGISTER_COMPANY_SUCCESS"
export const REGISTER_COMPANY_FAILUER = "REGISTER_COMPANY_FAILUER"


export const GET_ALL_COMPANIES_REQUEST = "GET_ALL_COMPANIES_REQUEST"
export const GET_ALL_COMPANIES_SUCCESS = "GET_ALL_COMPANIES_SUCCESS"
export const GET_ALL_COMPANIES_FAILUER = "GET_ALL_COMPANIES_FAILUER"





export const registerCompanyRequest = ()=>{
    return {
        type:REGISTER_COMPANY_REQUEST
    }
}
export const registerCompanySuccess = (data)=>{
    return {
        type:REGISTER_COMPANY_REQUEST,
        payload:data
    }
}
export const registerCompanyFailuer = (error)=>{
    return {
        type:REGISTER_COMPANY_REQUEST,
        payload:error
    }
}


export const getAllCompaniesRequest = ()=>{
    return {
        type:GET_ALL_COMPANIES_REQUEST,
    }
}

export const getAllCompanieSuccess = (data)=>{
    return {
        type:GET_ALL_COMPANIES_SUCCESS,
        payload:data
    }
}
export const getAllCompaniesFailuer = (error)=>{
    return {
        type:GET_ALL_COMPANIES_FAILUER,
        payload:error
    }
}