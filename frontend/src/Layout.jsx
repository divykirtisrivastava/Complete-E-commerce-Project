import React from 'react'
import Navbar from './components/Navbar'
import {Outlet} from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'


export default function Layout() {
  return (
   <>
   <UserContextProvider>
   <Navbar/>
   <Outlet/>
   </UserContextProvider>
   
   
   </>
  )
}
