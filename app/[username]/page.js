
import React, {useEffect} from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
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
