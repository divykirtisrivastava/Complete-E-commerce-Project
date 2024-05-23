import React, { useState } from "react";
import UserContext from "./Usercontext";

export default function UserContextProvider({children}){
    let [pass,setPass]=useState('')
    return(
       <UserContext.Provider value={{pass,setPass}}>
         {children}
       </UserContext.Provider>
    )
}