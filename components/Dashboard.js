import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { getUser, updateProfile } from '@/app/actions/useraction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        profilePicture: "",
        coverImage: "",
        razorpayId: "",
        razorpaySecret: "",
    });

    useEffect(() => {
        if (!session) {
            router.push("/login")
        } else {
            getData()
        }
    }, [router, session])

    const getData = async () => {
        if (session) {
            const user = await getUser(session.user.name)
            setFormData(user)
        }
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(formData, session.user.name)
        toast('Profile Updated successfully', {
            position: "top-right",
            autoClose: 5000,
            draggable: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />

            <div className="payment flex flex-col  w-[60%] justify-center items-center mx-auto gap-3 ">
                <h1>This is Dashboard</h1>
                <form onSubmit={handleFormSubmit} className="supporter flex w-1/2 flex-col gap-3  bg-slate-900 p-10 rounded-lg">
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

                    <label htmlFor="razorpayId">Razorpay Id</label>
                    <input value={formData.razorpayId} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter Razorpay Id' type="text" name="razorpayId" id="razorpayId" />

                    <label htmlFor="razorpaySecret">Razorpay Secret</label>
                    <input value={formData.razorpaySecret} onChange={handleFormChange} className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full' placeholder='Enter Razorpay Secret' type="text" name="razorpaySecret" id="razorpaySecret" />

                    <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3 w-full">Save</button>
                </form>
            </div>
        </>
    )
}

export default Dashboard
