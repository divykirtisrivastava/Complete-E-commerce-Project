import axios from 'axios'

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/Usercontext'

export default function HomePage() {
  let [user, setUser] = useState([])
  let [inp, setInp] = useState('')

  let {auth, getGogleProfile} = useContext(UserContext)
  let navigation = useNavigate()
  
    let { ID } = useParams()
    let {token} = useParams()

  useEffect(()=>{
    viewdata()
    printCartNumber()
  },[auth])
useEffect(()=>{
  if(token){
    localStorage.setItem('token', token)
    getGogleProfile()
    navigation('/')
  }
}, [token])

  async function viewdata() {
    let response = await axios.get('http://localhost:3000/api/products')
    setUser(response.data)
   
  }
  let {setCart} = useContext(UserContext)

  async function printCartNumber(){
    if(auth.user){
      let result = await axios.get(`http://localhost:3000/api/getCart/${auth.user}`)
    // setUser(response.data)
    setCart(result.data.length)
  }
  }
 

  
  function All(){
   viewdata()
  }
 
  async function onetothree(){
    let response = await axios.get('http://localhost:3000/api/products')
   let result = response.data.filter((item)=>item.productPrice>=1000 && item.productPrice<=3000)
    setUser(result)
    
  }
 async function threetofive(){
  let response = await axios.get('http://localhost:3000/api/products')
  
   let result = response.data.filter((item)=>item.productPrice>3000 && item.productPrice<=5000)
    setUser(result)
    
  }
  async function fivetoseven(){
    let response = await axios.get('http://localhost:3000/api/products')

   let result = response.data.filter((item)=>item.productPrice>5000 && item.productPrice<=7000)
   let final = result ? result : response.data
   setUser(final)
    
  }
  async function aboveseven(){
    let response = await axios.get('http://localhost:3000/api/products')

   let result = await response.data.filter((item)=>item.productPrice>7000)
   let final = result ? response.data : result
    setUser(final)
    
  }
 async function Shirt(){
  let response = await axios.get('http://localhost:3000/api/products')

   let result = response.data.filter((item)=>item.productType=='shirt')
    setUser(result)
    
  }
 async function jeans(){
  let response = await axios.get('http://localhost:3000/api/products')

   let result = response.data.filter((item)=>item.productType=='jeans')
    setUser(result)
    
  }
 async function watch(){
  let response = await axios.get('http://localhost:3000/api/products')

   let result = response.data.filter((item)=>item.productType=='watch')
    setUser(result)
    
  }
  useEffect(()=>{
    search()
    if(inp == ''){
      viewdata()
    }
  }, [inp])
  async function search() {
   if(inp){
    let response = await axios.get(`http://localhost:3000/api/productSearch/${inp}`)
    setUser(response.data)  
   }
  }

  const addcart = async(user)=>{
    if(auth.isAuthenticated){
      try{
        const response = await axios.post(`http://localhost:3000/api/saveCart/${auth.user}`,{
          productBrand:user.productBrand,
          productType:user.productType,
          productRating:user.productRating,
          productPrice:user.productPrice,
          productImage:user.productImage
        });
        let result = await axios.get(`http://localhost:3000/api/getCart/${auth.user}`)
        // setUser(response.data)
        setCart(result.data.length)
      }
      catch(error){
        console.log('err in saving product',error)
      }
    }else{
      navigation('/usersignin')
    }
  }

  return (
    <>
      {/* sidebar */}
      <div id='sidebar'>

        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
          
          <div className="mt-6 flex flex-1 flex-col justify-between" id='sidebar-local'>
            <nav className="-mx-3  ">
              <div className="space-y-3 ">
      
<form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className=" text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search"
        name='inp'
        value={inp}
        onChange={(e) => setInp(e.target.value)}   
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search items" required />
       
    </div>
</form>



                {/* <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={search}
                >
                  <span className="mx-2 text-sm font-medium">search</span>
                </button> */}
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                 onClick={All}
                >
                  <span className="mx-2 text-sm font-medium">All</span>
                </button>
              </div>
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-white">Price</label>
                
                <button
                onClick={onetothree}
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  
                >
                  <span className="mx-2 text-sm font-medium">1000 Rs - 3000Rs</span>
                </button>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                 onClick={threetofive}
                >
                  <span className="mx-2 text-sm font-medium">3000 Rs - 5000 Rs</span>
                </button>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  onClick={fivetoseven}
                >
                  <span className="mx-2 text-sm font-medium">5000 Rs - 7000 Rs</span>
                </button>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                 onClick={aboveseven}
                >
                  <span className="mx-2 text-sm font-medium">Above Rs 7000 </span>
                </button>
              </div>

              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-white">Type</label>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  onClick={Shirt}
                >
                  <span className="mx-2 text-sm font-medium">Shirt</span>
                </button>
                <button
                onClick={jeans}
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <span className="mx-2 text-sm font-medium">Jeans</span>
                </button>
                <button
                onClick={watch}
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <span className="mx-2 text-sm font-medium">Watch</span>
                </button>

                
              </div>
            </nav>
          </div>
        </aside>
      </div>


      {/* Card */}
      <div id='card'>
        {user.map((data, key) => (
           <div className="w-[300px] rounded-md border-4" key={key}>
           <img
             src={`http://localhost:3000/${data.productImage}`}
             className="h-[200px] w-full rounded-md object-cover"
           />
           <div className="p-4">
             <h1 className="text-lg font-semibold">Product Brand:- <span className='text-2xl font-bold'>{data.productBrand}</span></h1>
             <h1 className="text-lg font-semibold">Product Type:- <span className='text-2xl font-bold'>{data.productType}</span></h1>
             <h1 className="text-lg font-semibold">Product Price:- <span className='text-2xl font-bold'>{data.productPrice}</span></h1>
             <h1 className="text-lg font-semibold">Product Rating:- <span className='text-2xl font-bold'>{data.productRating}</span></h1>
             
             <button
               type="button"
               onClick={()=>addcart(data)}
               className="mt-4 rounded bg-black px-2.5 py-1 text-[13px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
             >
               Add to Cart
             </button>
           </div>
         </div>
        
        ))}
      </div>
    </>
  )
}

