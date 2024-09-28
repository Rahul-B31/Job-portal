
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const CreatedApplications = ({user}) => {


const token = localStorage.getItem("token")

const [applications,setApplication] = useState(null)
const [isLoading,setLoading] = useState(true)


useEffect(()=>{

    const getMyApplications = async ()=>{
      try {
          
            const res = await axios.get(`${BASE_URL}/api/my-applications/${user.user_id}`,{
          headers:{
            Authorization :`Bearer ${token}`
          }
        }) 
        setApplication(res.data) 
        setLoading(false)  
        console.log("The res for the my applicatons ",res.data)
      } catch (error) {
         console.log(error)
      }finally{
        setLoading(false)
      }    
    }

    getMyApplications();

},[user?.user_id])



  return (
    isLoading?(
      <BarLoader className="mt-6" width={"100%"} color="#36d7b7" />
       )
      :(
        <div className="flex flex-col gap-2">
        {applications?.map((application) => {
          return (
            <ApplicationCard
              key={application?.appId}
              applications={application}
              isCandidate={user?.accountType=='CANDIDATE'}
            />
          );
        })}
      </div>
    )

  );
};

export default CreatedApplications;