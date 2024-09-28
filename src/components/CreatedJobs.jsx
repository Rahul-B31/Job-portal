
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import JobCard from "./JobCard";

const CreatedJobs = () => {


  // const {
  //   loading: loadingCreatedJobs,
  //   data: createdJobs,
  //   fn: fnCreatedJobs,
  // } = useFetch(getMyJobs, {
  //   recruiter_id: user.id,
  // });

  // useEffect(() => {
  //   fnCreatedJobs();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  const createdJobs = [

    {
      id:1,
    },
    {
      id:2,
    },
    {
      id:3,
    },
    {
      id:4,
    },
  ]

  const isMyJob=true

  const loadingCreatedJobs = false
  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  isMyJob={isMyJob}
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