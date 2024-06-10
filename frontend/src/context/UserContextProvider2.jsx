import React, { useEffect, useState } from "react";
import UserContext from "./Usercontext";
import axios from "axios";

export default function UserContextProvider2({children}){
    let [cart,setCart]=useState('')
    let [googleLogin,setGoogleLogin]=useState('')
    const [auth, setAuth] = useState({
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      user: '',
      id: ''
  });

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/api/clientLogin', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuth({ token, isAuthenticated: true, user: email.split('@')[0], id: response.data.id });
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
          setAuth(prevAuth => ({ ...prevAuth, user: response.data.email.split('@')[0], id: response.data.id}));
          createUserCart(response.data.email.split('@')[0])
      } catch (error) {
          logout();
      }
  }
};
const getGogleProfile = async () => {
  const token = localStorage.getItem('token');
  if (token) {
      try {
          const response = await axios.get('http://localhost:3000/api/profile', {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          setAuth({token: token, isAuthenticated: true, user: response.data.email.split('@')[0], id: response.data.id });
          createUserCart(response.data.email.split('@')[0])
      } catch (error) {
          logout();
      }
  }
};

async function createUserCart(username) {
  await axios.post(`http://localhost:3000/api/createUserCart/${username}`)
}

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log(googleLogin)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     getProfile()
  }
}, []);
    return(
       <UserContext.Provider value={{cart,setCart, auth, login, logout, getGogleProfile}}>
         {children}
       </UserContext.Provider>
    )
}