import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Signup = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        profilePicture: "",
        coverImage: "",
        dob: "",
    });

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  return (
    <>
        <div className="image absolute h-[100vh] w-[99.2vw]">
            <img className="w-full h-full object-fit"  src="/signup-bg.jpg" alt="" />
        </div>
        <div className="payment flex flex-col  w-[60%] justify-center items-center mx-auto gap-3 relative p-20">
                <h1 className="text-3xl font-bold">SignUp - Get to know more</h1>
                <form className="supporter flex w-1/2 flex-col gap-3  bg-slate-900 p-10 rounded-lg">
                    <label htmlFor="name">Name</label>
                    <input value={formData.name} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter your name' type="text" name="name" id="name" />

                    <label htmlFor="email">Email</label>
                    <input value={formData.email} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter your email' type="email" name="email" id="email" />

                    <label htmlFor="username">Username</label>
                    <input value={formData.username} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter username' type="text" name="username" id="username" />

                    <label htmlFor="profilePicture">Profile Picture</label>
                    <input value={formData.profilePicture} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter profile picture' type="text" name="profilePicture" id="profilePicture" />

                    <label htmlFor="coverImage">Cover Image</label>
                    <input value={formData.coverImage} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter cover image' type="text" name="coverImage" id="coverImage" />

                    <label htmlFor="dob">Date of Birth</label>
                    <input value={formData.dob} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter date of birth' type="date" name="dob" id="dob" />

                    <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3 w-full">Save</button>
                </form>
            </div>
    </>
  )
}

export default Signup
