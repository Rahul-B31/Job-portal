export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';


export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const CURRENT_USER_REQUEST = "CURRENT_USER_REQUEST";
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';


export const LOGOUT_USER = 'LOGOUT_USER';


export const registerUserRequest = ()=>{
    return {
        type:REGISTER_USER_REQUEST
    }
}

export const registerUserSuccess = (data)=>{
    return {
        type:REGISTER_USER_SUCCESS,
        payload:data
    }
}
export const registerUserFailuer = (error)=>{
    return {
        type:REGISTER_USER_FAILURE,
        payload:error
    }
}

export const currentUserRequest = ()=>{
    return {
        type:CURRENT_USER_REQUEST
    }
}

export const currentUserSuccess = (data)=>{
    return {
        type:CURRENT_USER_SUCCESS,
        payload:data
    }
}
export const currentUserFailuer = (error)=>{
    return {
        type:CURRENT_USER_FAILURE,
        payload:error
    }
}
export const loginUserRequest = ()=>{
    return {
        type:LOGIN_USER_REQUEST
    }
}

export const loginUserSuccess = (data)=>{
    return {
        type:LOGIN_USER_SUCCESS,
        payload:data
    }
}
export const loginUserFailuer = (error)=>{
    return {
        type:LOGIN_USER_FAILURE,
        payload:error
    }
}




