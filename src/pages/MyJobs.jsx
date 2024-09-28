
import CreatedApplications from "@/components/CreatedApplications";
import CreatedJobs from "@/components/CreatedJobs";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

const MyJobs = () => {


  const {reqUser} = useSelector(state=>state.auth)

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {reqUser?.accountType === "CANDIDATE"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {reqUser?.accountType == "CANDIDATE"?(
        <CreatedApplications user={reqUser} />
      ) : (
        <CreatedJobs />
      )} 
    </div>
  );
};

export default MyJobs;