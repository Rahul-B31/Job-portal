import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { currentUser, login } from '@/Redux/Auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'


 const loginSchema = z.object({
  email: z.string().email({
      message: "Please enter a valid email address"
  }),
  password: z.string().min(3, {
      message: "Password must be at least 6 characters long"
  }),
  
})


const Login = () => {

  const token = localStorage.getItem("token")
  const naviagte =  useNavigate()
  const dispatch = useDispatch()





  const auth = useSelector(state=>state?.auth)


  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(()=>{
     dispatch(currentUser(token))
       if(auth?.reqUser?.name)
          naviagte("/")

       console.log(auth)
  },[auth?.reqUser?.name,token])

  // useEffect(()=>{
  //   if(token){
  //        console.log("The useeffect of token")
  //        dispatch(currentUser(token))
  //        naviagte("/")
  //   }
  // },[token])

  const onSubmit = (data) => {
      dispatch(login(data))
      
  };


  return (
    <div className='flex justify-center mt-28'>  
        <Card className="xl:w-1/3 md:w-1/4 shadow-lg shadow-slate-700 opacity-90">
        <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
               <h1 className="text-3xl font-semibold">Login</h1>
              
        </div>
        </CardHeader>
        <CardContent>

          <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="********" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </div>
              <Button type="submit" className="w-full">
                {"Login"}
              </Button>


             </form>
          </Form>
        </CardContent>
        <CardFooter>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* <h1 className="text-3xl font-semibold">{"back"}</h1> */}
            <p className="text-muted-foreground text-sm cursor-pointer" onClick={()=>naviagte("/register")}>Don't have an account? Register here.</p>
        </div>
        </CardFooter>
        </Card>
    </div>
  )
}

export default Login