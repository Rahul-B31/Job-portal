import { BASE_URL } from "@/api/config"
import { currentUserFailuer, currentUserRequest, currentUserSuccess, loginUserFailuer, loginUserRequest, loginUserSuccess, registerUserFailuer, registerUserRequest, registerUserSuccess } from "./actionTypes"


export const register = (data) => {
    return async (dispatch) => {
      try {

        dispatch(registerUserRequest) 

        const res = await fetch(`${BASE_URL}/auth/register`,{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
           },
           body:JSON.stringify(data)
          });
         
         const resdata = await res.json()

         if(resdata.jwt)
            localStorage.setItem("token",resdata.jwt)
         console.log("The res for register is ",resdata)
         dispatch(registerUserSuccess(resdata))
        
      } catch (error) {
        dispatch(registerUserFailuer(error))   
      }



    }
}


export const login = (data) => {
    return async (dispatch) => {
      try {

        dispatch(loginUserRequest()) 

        const res = await fetch(`${BASE_URL}/auth/login`,{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
           },
           body:JSON.stringify(data)
          });
         
         const resdata = await res.json()
         if(resdata.jwt)
          localStorage.setItem("token",resdata.jwt)
         console.log("The res for login  is ",resdata)
         dispatch(loginUserSuccess(resdata))
        
      } catch (error) {
        dispatch(loginUserFailuer(error))   
      }



    }
}
export const currentUser = (token) => {
    return async (dispatch) => {
      try {

        dispatch(currentUserRequest()) 

        const res = await fetch(`${BASE_URL}/api/profile`,{
           method:"GET",
           headers:{
             "Content-Type":"application/json",
              Authorization : `Bearer ${token}`
           }
          });
         
         const resdata = await res.json()
         console.log("The res for current user  is ",resdata)
         dispatch(currentUserSuccess(resdata))
        
      } catch (error) {
        dispatch(currentUserFailuer(error))   
      }



    }
}

export const logoutUser = ()=> async(dispatch)=>{
  localStorage.removeItem("token");
  dispatch(currentUserSuccess(null));
  
}