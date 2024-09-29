
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const CreatedJobs = ({user}) => {


  const [createdJobs,setCreatedJobs] = useState(null);
  const [loading,setLoading] = useState(true)

  const token = localStorage.getItem("token")


  const fetchCreatedJobs = async ()=>{
    try {
      setLoading(true)
      const res = await axios.get(`${BASE_URL}/api/created-jobs/${user?.user_id}`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
    setCreatedJobs(res.data);
    setLoading(false)
    console.log("The res for my created job is ",res.data)  

    } catch (error) {
       console.log(error)
    }finally{
      setLoading(false)
    }

}

  useEffect(()=>{

    if(user?.user_id)
       fetchCreatedJobs();  

  },[user?.user_id])



  return (
    <div>
      {loading ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs?.map((job) => {
              return (
                <JobCard
                  key={job?.jobId}
                  job={job}
                  isMyJob
                  onJobDelete={fetchCreatedJobs}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;   