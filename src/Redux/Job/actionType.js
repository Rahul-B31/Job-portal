import { Expand } from "lucide-react"


export const CREATE_JOB_REQUEST = "CREATE_JOB_REQUEST"
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS"
export const CREATE_JOB_FAILUER = "CREATE_JOB_FAILUER"


export const FETCH_ALL_JOB_POSTS_REQUEST = "FETCH_ALL_JOB_POSTS_REQUEST"
export const FETCH_ALL_JOB_POSTS_SUCCESS = "FETCH_ALL_JOB_POSTS_SUCCESS"
export const FETCH_ALL_JOB_POSTS_FAILUER = "FETCH_ALL_JOB_POSTS_FAILUER"


export const APPLY_JOB_REQUEST = "APPLY_JOB_REQUEST"
export const APPLY_JOB_SUCCESS =  "APPLY_JOB_SUCCESS"
export const APPLY_JOB_FAILUER=   "APPLY_JOB_FAILUER"


export const FETCH_SAVED_JOBS_REQUEST = "FETCH_SAVED_JOBS_REQUEST"
export const FETCH_SAVED_JOBS_SUCCESS = "FETCH_SAVED_JOBS_SUCCESS"
export const FETCH_SAVED_JOBS_FAILUER = "FETCH_SAVED_JOBS_FAILUER"





export const FETCH_JOB_BY_ID = "FETCH_JOB_BY_ID"





export const createJobRequest = ()=>{
    return {
        type:CREATE_JOB_REQUEST
    }
}
export const createJobSuccess = (data)=>{
    return {
        type:CREATE_JOB_SUCCESS,
        payload:data
    }
}
export const createJobFailuer = (error)=>{
    return {
        type:CREATE_JOB_FAILUER,
        payload:error
    }
}


export const fetchAllJobRequest = ()=>{
    return {
        type:FETCH_ALL_JOB_POSTS_REQUEST,
       
    }
}
export const fetchAllJobSuccess = (data)=>{
    return {
        type:FETCH_ALL_JOB_POSTS_SUCCESS,
        payload:data
    }
}
export const fetchAllJobFailuer = (error)=>{
    return {
        type:FETCH_ALL_JOB_POSTS_FAILUER,
        payload:error
    }
}


export const fetchJobByIdRequest =(data)=>{
      return {
        type:FETCH_JOB_BY_ID,
        payload:data
      }
}


export const applyJobRequest =()=>{
      return {
        type:APPLY_JOB_REQUEST
      }
}
export const applyJobSuccess =(data)=>{
      return {
        type:APPLY_JOB_SUCCESS,
        payload:data
      }
}
export const applyJobFailuer =(error)=>{
      return {
        type:APPLY_JOB_FAILUER,
        payload:error
      }
}


export const fecthSavedJobRequest = ()=>{
    return {
        type:FETCH_SAVED_JOBS_REQUEST
    }
}

export const fecthSavedJobSuccess = (data)=>{
    return {
        type:FETCH_SAVED_JOBS_SUCCESS,
        payload:data
    }
}

export const fecthSavedJobFailuer = (error)=>{
    return {
        type:FETCH_SAVED_JOBS_FAILUER,
        payload:error
    }
}