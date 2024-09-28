import JobCard from '@/components/JobCard';
import React from 'react'

const SavedJobs = () => {



  // const { isLoaded } = useUser();

  // const {
  //   loading: loadingSavedJobs,
  //   data: savedJobs,
  //   fn: fnSavedJobs,
  // } = useFetch(getSavedJobs);



  let  loadingSavedJobs = false 
  // useEffect(() => {
  //   if (isLoaded) {
  //     fnSavedJobs();
  //   }

  // }, [isLoaded]);

  // if (!isLoaded || loadingSavedJobs) {
  //   return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  // }

  return (
    <div>
    <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
      Saved Jobs
    </h1>

    {loadingSavedJobs === false && (
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {savedJobs?.length ? (
          savedJobs?.map((saved) => {
            return (
              <JobCard
                // key={saved.id}
                // job={saved?.job}
                // onJobAction={fnSavedJobs}
                // savedInit={true}
              />
            );
          })
        ) */}
       
          { 1==1?([1,2,3,4,5,6,7,8,9,10].map((saved) => {
            return (
              <JobCard
                // key={saved.id}
                // job={saved?.job}
                // onJobAction={fnSavedJobs}
                // savedInit={true}
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