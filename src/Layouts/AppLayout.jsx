import Header from '@/components/Header'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const AppLayout = () => {

  const location = useLocation()
  return (
    <div className=''>


        <div className="grid-background "> </div>

        <main className='min-h-screen container px-10'>

          {/* {location.pathname!="/login" && <Header/>} */}
          <Header/>
          <Outlet/>
        </main>

         <div className="p-10 text-center bg-gray-800 mt-10">Made by Rahul Barhate</div>

    </div>

  )
}

export default AppLayout