import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BarLoader } from 'react-spinners';
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { BASE_URL } from '@/api/config';

const ApplicationCard = ({applications,isCandidate}) => {

    const token = localStorage.getItem("token")

    const [loading,setLoading]  = useState(false);

  
    const handleDownload = async ()=>{

        
        try {
          const applicationId = applications?.appId;
          setLoading(true)
          const res = await axios.get(`${BASE_URL}/api/download-resume/${applicationId}`,{
            headers:{
              Authorization : `Bearer ${token}`
            },
            responseType:'blob'
         })

         

         const url = window.URL.createObjectURL(new Blob([res.data],{type:'application/pdf'}))
         const link = document.createElement("a")
         link.target="_Blank"
         link.href = url

         document.body.appendChild(link);
         link.click();
          
        } catch (error) {
          
        }finally{
          setLoading(false)
        }
        
        
          
    }

    // testing is pending 
    const handleStatusChange = async (status)=>{
          
        try {
          setLoading(true)
        const res = await axios.patch(`${BASE_URL}/api/appliaction-status/${applications?.appId}`,{
            status:status
        },{
           headers:{
            Authorization : `Bearer ${token}`
           }
        })
        setLoading(false)
        console.log("the res for the appliaction status ",res.data);            
        } catch (error) {
            console.log(error)
        }finally{
          setLoading(false)
        }
    }

    
    return (
        <Card>
          {loading && <BarLoader width={"100%"} color="#36d7b7" />}
          <CardHeader>
            <CardTitle className="flex justify-between font-bold">
              {isCandidate
                ? `${applications?.job?.title} at ${applications?.job?.company?.name}`
                : applications?.name}
              <Download
                size={18}
                className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
                onClick={handleDownload}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex gap-2 items-center">
                <BriefcaseBusiness size={15} /> {applications?.experience} years of
                experience
              </div>
              <div className="flex gap-2 items-center">
                <School size={15} />
                {applications?.education}
              </div>
              <div className="flex gap-2 items-center">
                <Boxes size={15} /> Skills: {applications?.skills}
              </div>
            </div>
            <hr />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span>{new Date(applications?.createdAt).toLocaleString('en-IN',{hour12:true})}</span>
            {isCandidate ? (
              <span className="capitalize font-bold">
                Status: {applications?.status}
                
              </span>
            ) : (
              <Select
                onValueChange={handleStatusChange}
                defaultValue={applications?.status}
              >
                <SelectTrigger className="w-52">
                  <SelectValue placeholder="Application Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CardFooter>
        </Card>
      );


    };


export default ApplicationCard