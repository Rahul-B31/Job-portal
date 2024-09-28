import { BASE_URL } from "@/api/config"
import { getAllCompaniesFailuer, getAllCompaniesRequest, getAllCompanieSuccess, registerCompanyFailuer, registerCompanyRequest, registerCompanySuccess } from "./actionTypes"


export const registerCompany = (data,token)=>{
    return  async (dispatch)=>{
        try {
             dispatch(registerCompanyRequest())

             const formData = new FormData()
             formData.append("name",data.name);
             formData.append("logo",data.logo[0]);
           const res = await fetch(`${BASE_URL}/api/register-company`,{
                method:"POST",
                headers:{
                     Authorization : `Bearer ${token}`
                },
                body:formData
            })
              const resdata  = await res.json();
              console.log("The res for register company is  is ",resdata)
               dispatch(registerCompanySuccess(resdata))

               return resdata;
            
        } catch (error) {
              dispatch(registerCompanyFailuer(error))
        }

    }
}


export const getAllCompany = (token)=>{
    return  async (dispatch)=>{
        try {
             dispatch(getAllCompaniesRequest())

           const res = await fetch(`${BASE_URL}/api/companies`,{
                method:"GET",
                headers:{
                     Authorization : `Bearer ${token}`
                },
            })
              const resdata  = await res.json();
              console.log("The res for all company is  is ",resdata)
              dispatch(getAllCompanieSuccess(resdata))
            
        } catch (error) {
              dispatch(getAllCompaniesFailuer(error))
        }

    }
}