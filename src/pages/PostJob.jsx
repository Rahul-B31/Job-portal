import AddCompanyDrawer from '@/components/AddCompanyDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getAllCompany } from '@/Redux/Company/actions';
import { createJob } from '@/Redux/Job/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';
import { State } from 'country-state-city';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { z } from 'zod';


const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});


const PostJob = () => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });


  const {companydata,loading} = useSelector(state=>state.company)
  const {reqUser} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")

  const navigate = useNavigate()






  const onSubmit = (data) => {

     const sendData  = {...data,recruiter_id:reqUser?.user_id}
     dispatch(createJob(sendData,token))
     navigate("/jobs")
    

  };




  // useEffect(() => {
  //   if (dataCreateJob?.length > 0) navigate("/jobs");
  // }, [loadingCreateJob]);





  if (reqUser?.accountType !== "RECRUITER") {
    return <Navigate to="/jobs" />;
  }

  useEffect(()=>{
    dispatch(getAllCompany(token))
},[])



  return (
    <div>  
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companydata?.find((com) => com.compId === field.value)
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  <SelectGroup>
                    {companydata?.length>0 && companydata?.map(({ name, compId }) => (
                      <SelectItem key={compId} value={compId}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer  />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />


        {/* {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errors.errorCreateJob && (
          <p className="text-red-500">{errors?.errorCreateJob?.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )} */}



        {loading && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );

}

export default PostJob