import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { BASE_URL } from '@/api/config'

const JobCard = ({job}) => {


  return (
      <Card className="flex flex-col">
         <CardHeader>
             <CardTitle className="flex justify-between font-bold">
                {job?.title}
             <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer'/>
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

            <Heart className='cursor-pointer' size={20} stroke='red' fill=' ' />
         </CardFooter>
      </Card>
  )
}

export default JobCard