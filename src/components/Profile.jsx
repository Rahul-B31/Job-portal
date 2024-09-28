import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { BriefcaseBusiness, Heart, LogOut, UserCircle2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/Redux/Auth/actions'
import { Link, useNavigate } from 'react-router-dom'

export const Profile = () => {

     const dispatch = useDispatch()  
     const auth = useSelector(state=>state?.auth) 
     const navigate = useNavigate()


    const handleLogout = ()=>{
        dispatch(logoutUser())
        navigate("/")         
    }

  return (
    
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Profile</Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel className="flex items-center gap-3"> <UserCircle2 size={20}/>{auth?.reqUser?.name}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem >
          <Link to="/my-jobs" className="flex items-center gap-3"><BriefcaseBusiness  size={15}  className='mr-2'/>My jobs</Link>
      </DropdownMenuCheckboxItem>

      <DropdownMenuCheckboxItem>
       <Link to="/saved-jobs" className="flex items-center gap-3"><Heart size={15} stroke='red' fill='red' className='mr-2'/> Saved jobs</Link>
      </DropdownMenuCheckboxItem>

      <DropdownMenuCheckboxItem onClick={handleLogout}>
       <LogOut size={15} className='mr-2'/>Logout
      </DropdownMenuCheckboxItem>

    </DropdownMenuContent>
  </DropdownMenu>
  )
}
