import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import axios from 'axios'
import {Link,useNavigate, useParams} from 'react-router-dom'


export default function Update() {
    let {ID}=useParams()
    let navigation = useNavigate()
    useEffect(()=>{
        
        viewdata()
    },[])
  let [user,setUser]=useState({
    productBrand:"",
    productType:"",
    productRating:"",
    productPrice:"",
    productImage: ""
})
const {productBrand,productType,productRating,productPrice, productImage} = user
console.log(productImage)

function handleSubmit(e){
  const { name, value, files } = e.target
    if (name === 'productImage') {
      setUser({ ...user, [name]: files[0] })
    } else {
      setUser({ ...user, [name]: value })
    }
}



async function viewdata() {
  let response = await axios.get(`http://localhost:3000/api/products/${ID}`)
  setUser(response.data[0])
}

  
  
  async function submitdata(e){
    e.preventDefault()
    // const formData = new FormData()
    // formData.append('productBrand', productBrand)
    // formData.append('productType', productType)
    // formData.append('productRating', productRating)
    // formData.append('productPrice', productPrice)
    // formData.append('productImage', productImage) 
    await axios.put(`http://localhost:3000/api/updateProduct/${ID}`,user,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    navigation('/admin')
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">change product</h2>
            
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    product_name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="product_name"
                      id="name"
                      name='productBrand'
                      value={productBrand}
                      onChange={(e)=>handleSubmit(e)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    product_type{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="product_type"
                      id="product_type"
                      name='productType'
                      value={productType}
                      onChange={(e)=>handleSubmit(e)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    product_rating{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="product_rating"
                      id="product_rating"
                      name='productRating'
                      value={productRating}
                      onChange={(e)=>handleSubmit(e)}
                    ></input>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    product_price{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="product_price"
                      id="product_price"
                      name='productPrice'
                      value={productPrice}
                      onChange={(e)=>handleSubmit(e)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="productImage" className="text-base font-medium text-gray-900">Product Image</label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      id="productImage"
                      name='productImage'
                      
                      onChange={handleSubmit}
                    />
                  </div>
                </div>
                <div>
                  <Link
                    type="submit"
                   
                    onClick={submitdata}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Update data<ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
             
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
