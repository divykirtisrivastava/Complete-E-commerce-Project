import React from 'react'
import Navbar from './components/Navbar'
import {Outlet} from 'react-router-dom'
import UserContextPRovider from './context/UserContextProvider'


export default function Layout() {
  return (
   <>
   <UserContextPRovider>
   <Navbar/>
   <Outlet/>
   </UserContextPRovider>
   
   
   </>
  )
}
