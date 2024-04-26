import React, { useContext, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import UserContext from '../context/Usercontext'

export default function Signin() {
  let navigation=useNavigate()
  let [user,setUser] = useState({
    email:'',
    password:''
  })

  let {email,password}=user

  function handleSubmit(e){
    setUser({...user,[e.target.name]:e.target.value})
  }

  let {setPass}=useContext(UserContext)

  async function savedata(){

     let result = await axios.post('http://localhost:3000/login',user)
    if(result.data==true){
      setPass(true)
      navigation('/admin')
    }
    else{
      alert('wrong details')
    }
  }
  
  return (
    <section id='signin'>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name='email'
                      value={email}
                      onChange={(e)=>handleSubmit(e)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </a>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      name='password'
                      value={password}
                      onChange={(e)=>handleSubmit(e)}
                    ></input>
                  </div>
                </div>
                <div>
                  <Link
                    type="button"
                    to='/admin'
                    onClick={savedata}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Sign in <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
             
              
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
