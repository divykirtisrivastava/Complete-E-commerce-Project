import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import '../App.css'


export default function ClientSignup() {
  let navigation = useNavigate()

let [username,setUserName]=useState("");
let [email,setEmail]=useState("");
let [password,setPassword]=useState("");
let [image,setImage]=useState(null);


const onSubmit = async (e)=>{
  e.preventDefault();

    const user = new FormData();
  user.append('image', image)
  user.append('username',username)
  user.append('email',email)
  user.append('password',password)
  
  try{
    await axios.post('http://localhost:3000/api/saveClient',user,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    });
    navigation("/usersignin")

  }
  catch(err){
    alert('Failed to upload product.')
  }

}



  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create Account</h2>
            
            <form action="#" method="POST" className="mt-8" onSubmit={onSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                  User Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="userName"
                      id="username"
                      name='username'
                      value={username}
                      onChange={(e)=>setUserName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Email{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="email"
                      id="email"
                      name='email'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="password"
                      id="password"
                      name='password'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Upload image{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      placeholder="Upload file"
                      id="product_price"
                      accept='image/*'
                      onChange={(e)=>setImage(e.target.files[0])}
                    ></input>
                  </div>
                </div>
               
                <div>
                  <button
                    type="submit"
                    
                    
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                   Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
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
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
