import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from '@/Redux/Auth/actions'
import { Profile } from '../components/Profile'


const Header = () => {


     const auth = useSelector(state=>state.auth)

     const token = localStorage.getItem("token")
     const dispatch = useDispatch();

     console.log("------",auth)

     useEffect(()=>{
      if(token)
         dispatch(currentUser(token))
     },[token])
  return (
   <div className="">
      <nav className='py-4 flex justify-between items-center'>
           <Link >
                <img src="/logo.png" className=' h-10 md:h-16' alt="" />
           </Link>

           <div className="flex justify-between gap-4">
           <Link to="/post-jobs">

           {/*  This button is only shown to the recruiter not the candidate handle this condition */}
             
               <Button variant="destructive" className="rounded-full  h-10 md:h-15">
                    <PenBox size={15} className='mr-2'/>
                    Post a Job
               </Button>
           </Link>

            {auth?.reqUser?.name && 
               <Profile/>
            }  
           <Link to="/login">
               {!auth?.reqUser?.name && 
               <Button variant="outline">Login</Button>
               }
           </Link>
           </div>
      </nav>
   </div>
  )
}

export default Header