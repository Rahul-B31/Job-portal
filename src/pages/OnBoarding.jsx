import { Button } from "@/components/ui/button"
import { currentUser, register } from "@/Redux/Auth/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners"

const OnBoarding = () => {
   
  // if the user is loaded 
  //  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};
  const token = localStorage.getItem("token")

  


 const dispatch =  useDispatch()

 const {auth} = useSelector(state=>state)


  const handleRoleSelection = (accountType)=>{
    // handle the role 
    // if the role is recruiter redirect to the /post-job
    // if the role is candidate redirect to the /job-listing

     const updatedData = { ...formData, accountType };
     console.log("upadated data",updatedData)
     dispatch(register(updatedData))


    
  }

  useEffect(()=>{
    if(token){
         dispatch(currentUser(token))
         navigate("/")
    }
  },[token])


  useEffect(()=>{
    if(auth?.reqUser?.name)
    {
       navigate("/")
    } 
  },[]);

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold  text-7xl sm:text-8xl tracking-tighter">I am a...</h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">

             <Button variant="blue" className="h-20 md:h-30  text-2xl" onClick={()=>handleRoleSelection("CANDIDATE")}>
                   Candidate
              </Button>

             <Button variant="destructive" className="h-20 md:h-30  text-2xl" onClick={()=>handleRoleSelection("RECRUITER")}>
                   Recruiter
              </Button>
      </div>
    </div>
  )
}

export default OnBoarding