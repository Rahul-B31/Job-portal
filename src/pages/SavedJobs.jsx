import JobCard from '@/components/JobCard';
import { fetchSavedJobs } from '@/Redux/Job/actions';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';

const SavedJobs = () => {

  const {loading,savedjobs} = useSelector(state=>state.jobs)
  const {reqUser} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")

  // if (loading) {
  //   return ;
  // }

  useEffect(()=>{
       dispatch(fetchSavedJobs(reqUser?.user_id,token))
  },[savedjobs.length])

  return (
    <div>
    <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
      Saved Jobs
    </h1>

    {loading?<BarLoader className="mb-4" width={"100%"} color="#36d7b7" />:(
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedjobs?.length ? (
          savedjobs?.map((saved) => {
            return (
              <JobCard
                key={saved.id}
                job={saved?.job}
                savedInit={true}
              />
            );
          })
        )      
        : (
          <div>No Saved Jobs 👀</div>
        )}
      </div>
    )}
  </div>




  )
}

export default SavedJobs