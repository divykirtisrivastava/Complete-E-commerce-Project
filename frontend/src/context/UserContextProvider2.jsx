import React, { useState } from "react";
import UserContext from "./Usercontext";

export default function UserContextPRovider2({children}){
    let [cart,setCart]=useState('')
    let [release, setRelease]= useState('')
    return(
       <UserContext.Provider value={{cart,setCart, release, setRelease}}>
         {children}
       </UserContext.Provider>
    )
}