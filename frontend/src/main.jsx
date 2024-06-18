import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import Table from './admin/Table.jsx'
import Signup from './admin/Signup.jsx'
import View from './admin/View.jsx'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Update from './admin/Update.jsx'
import Signin from './admin/Signin.jsx'
import Protected from './admin/Protected.jsx'
import { Cart } from './client/Cart.jsx'
import ClientSignup from './client/ClientSignup.jsx'
import UserSignin from './client/UserSignin.jsx'
import HomePage from './client/HomePage.jsx'
import Checkout from './client/Checkout.jsx'






const router = createBrowserRouter(
  createRoutesFromElements(
<>
<Route path='/' element={<App/>}>
  <Route path='' element={<HomePage/>}/>
  <Route path='/:token' element={<HomePage/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/checkout' element={<Checkout/>}/>
  <Route path='/usersignup' element={<ClientSignup/>}/>
  <Route path='/usersignin' element={<UserSignin/>}/>

</Route>


    <Route path='/admin' element={<Layout/>}>
    <Route path='' element={
      <Protected>
        <Table/>
      </Protected>
    }/>
    <Route path='/admin/signup' element={
      <Protected>
        <Signup/>
      </Protected>
    }/>
    <Route path='/admin/signin' element={<Signin/>}/>
     <Route path='/admin/view/:ID' element={<View/>}/>
     <Route path='/admin/update/:ID' element={<Update/>}/>
    </Route>
</>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
