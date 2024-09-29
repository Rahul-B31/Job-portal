import { Button } from "@/components/ui/button"

import { Link, useNavigate } from "react-router-dom"

import companies from "../data/companies.json"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqs from "../data/faq.json"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSavedJobs } from "@/Redux/Job/actions";

const LandingPage = () => {


  const {reqUser} = useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const token = localStorage.getItem("token")


  const handlePostJobClick = ()=>{
        if(reqUser.accountType==="RECRUITER"){
              navigate("/post-jobs")
        }else{
          window.prompt("Your are not recruiter ")
        }
       
  }

  
 useEffect(()=>{
      if(reqUser)
        dispatch(fetchSavedJobs(reqUser?.user_id,token))
 },[reqUser]) 


  return (
    <div>
         <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
            <section className="text-center">
                 <h1 className="flex flex-col items-center justify-center gradient-title text-4xl sm:text-6xl lg:text-8xl font-extrabold
                 gradient-title tracking-tighter py-8">
                  Find Your Dream Job 
                  <span className="flex items-center gap-2 sm:gap-6">and get <img className="h-14 sm:h-24 lg:h-32" src="/logo.png" alt="hired logo" /></span></h1>

                  <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
                     Explore thousands of job listings or find the perfect candidate
                 </p>
            </section>


            <div className="flex gap-6 justify-center">
              {/* Buttons */}

              <Link to="/jobs" >
                  <Button variant="blue" size="xl">Find Jobs</Button>
              </Link>


              
                  <Button onClick={handlePostJobClick} size="xl"  variant="destructive">Post Jobs</Button>
             
            </div>

              {/* Carousel */}


              <Carousel
                 plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              className="w-full py-10">
                  <CarouselContent className="flex gap-5 sm:gap-20 items-center">
                   {companies.map(({name,id,path})=>{
                      return (
                        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                            <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
                        </CarouselItem>
                      );

                   })}
                  </CarouselContent>  
              </Carousel>




            {/* Banner */}

            <img src="/banner.jpeg" alt="banner image" className="w-full" />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* card */}
               <Card>
                <CardHeader>
                 <CardTitle className="font-bold">For Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                    Search and apply for jobs, track applications, and more.
                </CardContent>
              </Card>



              <Card>
                <CardHeader>
                   <CardTitle className="font-bold">For Employers</CardTitle>
                </CardHeader>
              <CardContent>
                  Post jobs, manage applications, and find the best candidates.
              </CardContent>
             </Card>


            </section>

        

            {/* accordian */}


      <Accordion type="multiple" className="w-full">
         {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>


         </main>
    </div>
  )
}

export default LandingPage;