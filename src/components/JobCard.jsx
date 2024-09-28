import React, { useEffect, useId, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { BASE_URL } from '@/api/config'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { fetchSavedJobs } from '@/Redux/Job/actions'

const JobCard = ({job,
                   isMyJob=false,
                   savedInit=false,
                   onJobDelete = () => {},
                   }) => {

    const {reqUser} = useSelector(state=>state.auth)

    const [saved,setSaved] = useState(savedInit)
    const token = localStorage.getItem("token")
    const [loading ,setLoading] = useState(false);
    const {savedjobs} = useSelector(state=>state.jobs) 

    const dispatch = useDispatch()

    useState(() => {
        const isJobSaved = savedjobs.some(savedJob => savedJob?.job?.jobId === job?.jobId);
        setSaved(isJobSaved);
     }, [savedjobs, job?.jobId]);

     const SaveJob = async ()=>{
  
        const res =  await axios.post(`${BASE_URL}/api/saved-job`,{
            userId:reqUser?.user_id,
            jobId: job?.jobId

        },{
            headers:{
              Authorization : `Bearer ${token}`
            }
        })
        console.log("the res for the saved job is ",res.data)

    }

    const handleSaveJob= async ()=>{

        if(saved)
        {
            setSaved(false)
            await handleUnSavedJob();
            dispatch(fetchSavedJobs(reqUser?.user_id,token))
        }
        else{
            SaveJob();
            setSaved(true);
        }

    }

    const handleUnSavedJob= async ()=>{

        const res = await axios.delete(`${BASE_URL}/api/saved-job/${reqUser?.user_id}/${job?.jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

    
        console.log("unsaved--",res.data)


    }


    const handleDeleteJob= async ()=>{

          try {
            setLoading(true)
            const res  = await axios.delete(`${BASE_URL}/api/delete-job/${job?.jobId}`,{
                headers:{
                   Authorization : `Bearer ${token}`
                } 
           });
           await onJobDelete();
           setLoading(false)
           console.log("the res for delete job ",res.data)
           
          }catch (error) {
            console.log(error)
          }
            
            


    }


 


  return loading ?(<BarLoader className="mt-4" width={"100%"} color="#36d7b7" />):(
      <Card className="flex flex-col">
         <CardHeader>
             <CardTitle className="flex justify-between font-bold">
                {job?.title}
                {isMyJob && (
                <Trash2Icon
                    className="text-red-300 cursor-pointer"
                    fill="red"
                    size={18}
                    onClick={handleDeleteJob}
                />
            )}
             
             </CardTitle>
         </CardHeader>

         <CardContent className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between">

                {/* company image */}
                 <img src={`${BASE_URL}/${job?.company?.logoUrl}`} alt={job?.company?.name} className='h-6' />

                <div className="flex gap-2 items-center">
                    {/* location of the company */}
                      <MapPinIcon size={15}/>
                     <p>{job?.location}</p>
                </div>         
            </div>
            <hr />

            {/* Job description */}
            <p>{job?.jobDescription}</p>
         </CardContent>

         <CardFooter className="flex gap-2">
            <Link to={`/job/${job?.jobId}`} className='flex-1'>
                 <Button variant="secondary" className="w-full">
                     More Details
                 </Button>
            </Link>
            {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            // disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
         </CardFooter>
      </Card>
  )
}

export default JobCard