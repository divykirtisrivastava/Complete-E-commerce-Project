import axios from 'axios'
import '../App.css'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function View() {
    let [user, setUser] = useState([])

    let {ID}=useParams()
    

    async function viedata() {
      let response = await axios.get(`http://localhost:3000/api/products/${ID}`)
      setUser(response.data)
    }
    viedata()

  return (
    <>
    {user.map((data, key)=>(
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row" id='main_div' key={key}>
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4">
       
          <p className="mt-3 text-sm text-gray-600">
         product name:-{data.productBrand} </p>
          <div className="mt-4">
          <p className="mt-3 text-sm text-gray-600">
         product rating:-{data.productRating} </p>
         <p className="mt-3 text-sm text-gray-600">
         product type:-{data.productType} </p>
         <p className="mt-3 text-sm text-gray-600">
         product price:-{data.productPrice} </p>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            
            
          </div>
        </div>
      </div>
    </div>
    ))}
    </>
  )
}
