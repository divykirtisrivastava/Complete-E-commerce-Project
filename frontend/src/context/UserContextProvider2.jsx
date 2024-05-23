import React, { useEffect, useState } from "react";
import UserContext from "./Usercontext";
import axios from "axios";

export default function UserContextProvider2({children}){
    let [cart,setCart]=useState('')
    const [auth, setAuth] = useState({
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      user: ''
  });

  const login = async (username, password) => {
    const response = await axios.post('http://localhost:3000/api/clientLogin', { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuth({ token, isAuthenticated: true, user: username });
    return true
};

const logout = () => {
  localStorage.removeItem('token');
  setAuth({ token: null, isAuthenticated: false, user: null });
};

const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (token) {
      try {
          const response = await axios.get('http://localhost:3000/api/profile', {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          setAuth(prevAuth => ({ ...prevAuth, user: response.data.username }));
      } catch (error) {
          logout();
      }
  }
};

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getProfile();
  }
}, []);
    return(
       <UserContext.Provider value={{cart,setCart, auth, login, logout}}>
         {children}
       </UserContext.Provider>
    )
}