import { BASE_URL } from "@/api/config";
import { applyJobFailuer, applyJobRequest, applyJobSuccess, createJobFailuer, createJobRequest, createJobSuccess, fecthSavedJobFailuer, fecthSavedJobRequest, fecthSavedJobSuccess, fetchAllJobFailuer, fetchAllJobRequest, fetchAllJobSuccess, fetchJobByIdRequest } from "./actionType"
import axios from "axios";


export const createJob = (data,token)=>{
   
    return async (dispatch)=>{
      try {
         
        dispatch(createJobRequest());
        const res = await fetch(`${BASE_URL}/api/post-job`,{
            method:"POST",
            headers:{
               Authorization:`Bearer ${token}`,
               "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        console.log("The original data is ",data)
        const resdata = await res.json();
        console.log("The res for create job ",resdata)
        dispatch(createJobSuccess(resdata))

        
      }catch (error) {
        dispatch(createJobFailuer(error))
        
      }

          

    }
}


export const fetchAllJob = (token)=>{
    return async (dispatch)=>{
     try {

          
        dispatch(fetchAllJobRequest());

        const res = await fetch(`${BASE_URL}/api/jobs`,{
            method:"GET",
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        const resdata = await res.json();
        console.log("The res for fetch all job",resdata);
        dispatch(fetchAllJobSuccess(resdata))

     }catch (error) {
        dispatch(fetchAllJobFailuer(error))
    }
 }

}

export const fetchJobById = (jobid,token)=>{

    return async (dispatch)=>{
        
      try {

        const res = await fetch(`${BASE_URL}/api/job/${jobid}`,{
            method:"GET",
            headers:{
                Authorization : `Bearer ${token}`
            }
        })

        const resdata = await res.json();
        console.log("The res for the single id ",resdata)
        dispatch(fetchJobByIdRequest(resdata))
        
      } catch (error) {
          console.log(error)
        
      }
      

    }

}


export const applyJob = (data,token) => {

        const formdata  = new FormData()
        formdata.append("file",data?.resume[0])
        formdata.append("candidate_id",data?.candidate_id)
        formdata.append("education",data?.education)
        formdata.append("jobId",data?.jobId)
        formdata.append("name",data?.name)
        formdata.append("skills",data?.skills)
        formdata.append("experience",data?.experience)
        formdata.append("status",data?.status)

        return async (dispatch)=>{

          try {
            dispatch(applyJobRequest())
            const res =  await fetch(`${BASE_URL}/api/apply`,{
               method:"POST",
               headers:{
                  Authorization : `Bearer ${token}`
               },
               body:formdata
             })
 
           const resdata = await res.json();
           console.log("the res for apply job is ",resdata)
           dispatch(applyJobSuccess(resdata))   
 
            
          } catch (error) {
               dispatch(applyJobFailuer(error))
          }

        }
}

export const fetchSavedJobs = (useId,token)=>async(dispatch)=>{

  try { 
       dispatch(fecthSavedJobRequest()) 
       const res = await axios.get(`${BASE_URL}/api/saved-job/${useId}`,{
       headers:{
            Authorization : `Bearer ${token}`
       }
    })
   dispatch(fecthSavedJobSuccess(res.data))
   console.log("save jobs...",res.data)
 } catch (error) {
     dispatch(fecthSavedJobFailuer(error))
 }



}