
import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import User from '../models/User'
import { notFound } from 'next/navigation'
import connectDB from '../db/connectDB'

const Username = async ({ params }) => {
  
  const checkUser = async () =>{
    await connectDB()
    let user = await User.findOne({username : params.username})
    if(user){
      return notFound()
    }
  }

  await checkUser()

  return (
    <PaymentPage username={params.username}/>
    
  )
}

export default Username
