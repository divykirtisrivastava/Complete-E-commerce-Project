import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarNew from './client/NavbarNew'
import { Outlet } from 'react-router-dom'
import UserContextProvider2 from './context/UserContextProvider2'

function App() {
  const [count, setCount] = useState(0)
 

  return (
    <>
    <UserContextProvider2>
    <NavbarNew />
     <Outlet/>
    </UserContextProvider2>
    
    </>
  )
}

export default App
