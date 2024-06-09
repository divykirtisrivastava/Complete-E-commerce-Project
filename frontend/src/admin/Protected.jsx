import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/Usercontext'

export default function Protected({children}) {
 
let {pass} = useContext(UserContext)

    if(true){
        return children
    }
    else{
        return <Navigate to='/admin/signin'/>
    }


  
}
