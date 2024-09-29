import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { currentUser } from '@/Redux/Auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { z } from 'zod'


 const RegisterSchema = z.object({
  email: z.string().email({
      message: "Please enter a valid email address"
  }),
  name: z.string().min(1, {
      message: "Please enter your name"
  }),
  password: z.string().min(3, {
      message: "Password must be at least 6 characters long"
  }),
  
})


const Register = () => {


  const navigate =  useNavigate()

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const auth = useSelector(state=>state?.auth)

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate('/onboarding', { state: { formData: data } });

  };


  useEffect(()=>{
    if(token)
      dispatch(currentUser(token))
      if(auth?.reqUser?.name)
         navigate("/")

      // console.log(auth)
 },[auth?.reqUser?.name])





  return (
    <div className='flex justify-center  items-center w-full'>  
        <Card className="xl:w-1/3 md:w-1/2 lg:w-1/2 shadow-md shadow-slate-700 opacity-90">
        <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
               <h1 className="text-3xl font-semibold">Register</h1>
               <p className="text-muted-foreground text-sm">Create an account</p>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
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
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="********" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </div>
              <Button type="submit" className="w-full">
                {"Register"}
              </Button>


             </form>
          </Form>
        </CardContent>
        <CardFooter>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* <h1 className="text-3xl font-semibold">{"back"}</h1> */}
            <p className="text-muted-foreground text-sm cursor-pointer" onClick={()=>navigate("/login")}>Already have an account? Login here</p>
        </div>
        </CardFooter>
        </Card>
    </div>
  )
}

export default Register