import { BASE_URL } from '@/api/config';
import ApplicationCard from '@/components/ApplicationCard';
import ApplyJobDrawer from '@/components/ApplyJobDrawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchJobById } from '@/Redux/Job/actions';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const Job = () => {
   

  //job id 
  const {id} = useParams();

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")

  const {post} = useSelector(state=>state.jobs)
  const {reqUser} = useSelector(state=>state.auth)


  const [isApplied,setIsApplied] = useState(null);
  console.log("the post data ",post)
  const handleStatusChange = ()=>{


  }

useEffect(()=>{
     const checkIsAppiled = async ()=>{
          try {

            const res = await axios.get(`${BASE_URL}/api/isapply`,{
                params:{
                  userId: reqUser?.user_id,
                  jobId: post?.jobId,
                },
                headers:{
                  Authorization :`Bearer ${token}`
                }
               })

             setIsApplied(res.data);         
          } catch (error) {
            
          }

     }
     checkIsAppiled();
})
   

  //fetch details of the job using the id 
  useEffect(()=>{
      dispatch(fetchJobById(id,token))
  },[])


  return (
    <div className='flex flex-col gap-8 mt-5'>
        
        <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
             <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{post?.title}</h1>
             <img src={`${BASE_URL}/${post?.company?.logoUrl}`} alt={post?.company?.name} className='h-12'  />
        </div>

        <div className="flex justify-between">
            <div className="flex gap-2">
                <MapPinIcon/>
                {/* location */}
               <p>{post?.location}</p>
            </div>

            <div className='flex gap-2'>
                <Briefcase/>
                {/* Number of application  */}
                <p>{post?.applicationCount}</p>
            </div>

            <div className="flex gap-2">
                {post?.open?(
                  <><DoorOpen/><p>Open</p></>
                )
                :(
                    <><DoorClosed/><p>Closed</p></>
                 ) 
              } 
            </div>
        </div>


        {/* Hiring  status */}
        {post?.recruiter?.user_id==reqUser?.user_id &&
        <Select onValueChange={(value) => handleStatusChange}>
          <SelectTrigger className={`w-full ${post?.open ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={
              "Hiring Status " + (post?.open ? "( Open )" : "( Closed )")
            } />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value={"Open"}>Open</SelectItem>    
              <SelectItem value={"Closed"}>Closed</SelectItem>    
          </SelectContent>
        </Select> 
   }

        <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>

        {/* job descrption */}
        <p className='sm:text-lg'>{post?.jobDescription}</p>

        <h2 className='text-2xl sm:text-3xl font-bold'>What  we are looking for
        </h2>

        {/* md editor */}

        <MDEditor.Markdown
        source={post?.requirements}
        className="bg-transparent sm:text-lg" 
      />

      {/* render application */}

      {/* job.recruiter.id !==user.id && */}
       {post?.recruiter?.user_id != reqUser?.user_id &&
          <ApplyJobDrawer job={post} user={reqUser} applied={isApplied}/>
      }
 

     {/* job.applications?.length>0 && job?.recruiter_id===user?.id && */}

     <div className="flex flex-col gap-3">
         <h2 className='text-2xl sm:text-3xl font-bold '>Application</h2>
         {/* Render all the application here using the map */}
         <ApplicationCard/>
         <ApplicationCard/>
         <ApplicationCard/>
     </div>

      
    </div>
  )
}

export default Job