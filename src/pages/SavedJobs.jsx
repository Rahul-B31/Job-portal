import JobCard from '@/components/JobCard';
import React from 'react'
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';

const SavedJobs = () => {



  const {loading,savedjobs} = useSelector(state=>state.jobs)

  // const { isLoaded } = useUser();

  // const {
  //   loading: loadingSavedJobs,
  //   data: savedJobs,
  //   fn: fnSavedJobs,
  // } = useFetch(getSavedJobs);

  // useEffect(() => {
  //   if (isLoaded) {
  //     fnSavedJobs();
  //   }

  // }, [isLoaded]);

  if (loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
    <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
      Saved Jobs
    </h1>

    {loading === false && (
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