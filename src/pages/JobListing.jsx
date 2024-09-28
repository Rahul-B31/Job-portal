import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllCompany } from '@/Redux/Company/actions';
import { fetchAllJob } from '@/Redux/Job/actions';
import { State } from 'country-state-city';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const JobListing = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");


  const dispatch = useDispatch()

  const navigate = useNavigate();

  const auth = useSelector(state=>state.auth)

  const token = localStorage.getItem("token")
  
  const {companydata }=useSelector(state=>state.company)
  console.log("comp data",companydata)
  
  const {posts, loading} = useSelector(state=>state.jobs)
  console.log("job posts are ",posts)



  useEffect(()=>{
      if(!auth?.reqUser?.name)
      {
          navigate("/login")   
      }
  },[auth?.reqUser])




  useEffect(()=>{  
       dispatch(fetchAllJob(token))
       dispatch(getAllCompany(token))
  },[posts?.length])


  const handleSearch = (e)=>{
      e.preventDefault();
      let formData = new FormData(e.target);
      const query = formData.get("search-query");

      if(query) setSearchQuery(query);
  }

  const clearFilters = ()=>{

    setCompany_id("");
    setLocation("");
    setSearchQuery("")
  }

  // const { isLoaded } = useUser();


  // const {
  //   // loading: loadingCompanies,
  //   data: companies,
  //   fn: fnCompanies,
  // } = useFetch(getCompanies);


  // const {
  //   loading: loadingJobs,
  //   data: jobs,
  //   fn: fnJobs,
  // } = useFetch(getJobs, {
  //   location,
  //   company_id,
  //   searchQuery,
  // });


  // useEffect(() => {
  //   if (isLoaded) {
  //     fnCompanies();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoaded]);



  // useEffect(() => {
  //   if (isLoaded) fnJobs();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoaded, location, company_id, searchQuery]);




  return (
    <div >
            
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        Latest Jobs
      </h1>

      {/* filter */}

      <form onSubmit={handleSearch} className='h-14 flex w-full gap-2 items-center mb-3'>
         <Input
             type="text"
             placeholder="Search Jobs By Title... "
             name="search-query"
             className="h-full flex-1 px-4 text-md"
         />

         <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
         </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>

{/* for selecting the state */}
      <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>



{/* slecting the company */}
      <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companydata?.map(({name,compId}) => {
                return (
                  <SelectItem key={compId} value={compId}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">
          Clear Filters
        </Button>


      </div>
      {/* Here we can add the loader for the job <barloader/> */}

    
        {loading &&
             <BarLoader className="mt-6" width={"100%"} color="#36d7b7" />
        }


     {!loading && 

      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>


           {posts?.length >0 ?(

            posts?.map((post)=>{
               return <JobCard key={post.jobId} job={post}/>
            })
           ):(
          <div className="">
            No Jobs Found 
         </div>
           )}

      </div>
}

    </div>
  )
}

export default JobListing