"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { createPayment, getUser, getPayments } from '../app/actions/useraction'
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'

const PaymentPage = ({ username }) => {
    const [paymentForm, setPaymentForm] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const { data: session } = useSession()
    const searchParams = useSearchParams()

    useEffect(() => {
        fetchUser()
    },[])

    useEffect(() => {
        if (searchParams.get('paymentdone') === 'true') {
            toast('Thanks for supporting', {
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
        }
    }, [])

    const payment = async (amount) => {
        try {
            let response = await createPayment(amount, username, paymentForm)
            let orderId = response.id;
            const options = {
                key: currentUser.razorpayId,
                amount: amount * 100, // Razorpay works with paisa, so multiply amount by 100
                currency: "INR",
                name: "Your Company",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orderId,
                callback_url: process.env.NEXT_PUBLIC_URI + "/api/razorpay",
                prefill: {
                    name: paymentForm.name || "",
                    email: session?.user?.email || "",
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            console.log('Razorpay Options:', options);
            const rzp1 = new window.Razorpay(options);
            console.log("rzp1", rzp1)
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    }

    const handleFormChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
        if (e.target.name === "amount") {
            payment(e.target.value)
            if (e.target.value < 0) {
                alert("Enter positive amount")
            }
        }
    };

    const fetchUser = async () => {
        const user = await getUser(username)
        setCurrentUser(user)
        let dbPayments = await getPayments(username)
        setPayments(dbPayments)
    }

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

            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
            <div className="flex flex-col items-center justify-center relative">
                <img src={currentUser.coverImage} alt="bg" className="w-full h-[450px] object-cover" />
                <div className='absolute -bottom-10 border-2 border-white rounded-full'>
                    <Image className='rounded-full w-[120px] h-[120px]' src={currentUser.profilePicture} alt="" width={120} height={120} />
                </div>
            </div>
            <div className='flex justify-center items-center my-12 flex-col gap-1'>
                <div className='text-2xl font-bold'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    creating Authentic Law Enforcement Content
                </div>
                <div className='text-slate-400'>
                    2,104 members 377 posts
                </div>
            </div>
            <div className="payment flex w-[80%] mx-auto gap-3 pb-20">
                <div className="supporter w-1/2 bg-slate-900 p-10">
                    <div className="text-2xl font-bold">Supporters</div>
                    <ul>
                        {payment.length < 0 && <div className='text-slate-400'>No one donated yet</div>}
                        {payments.map((p, i) => (
                            <li key={i} className='my-4 flex gap-2 items-center'>
                                <div className='w-7 h-7 rounded-full bg-slate-700 p-1'>
                                    <Image src={'/user.gif'} alt="" width={20} height={30} />
                                </div>
                                <span>
                                    {p.name} donated <span className='text-red-500 font-bold'>₹{p.amount}</span> with message {p.message}
                                </span>
                            </li>
                        ))}


                    </ul>
                </div>
                <div className="makePayment w-1/2 bg-slate-900 p-10">
                    <div className="text-2xl font-bold mb-4">Make Payment</div>
                    <div className="text-slate-400 flex flex-col gap-3">
                        <input onChange={handleFormChange} value={paymentForm.name} name="name" className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full ' type="text" placeholder='Enter Name' />

                        <input onChange={handleFormChange} value={paymentForm.message} name="message" className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full ' type="text" placeholder='Enter Message' />

                        <input onChange={handleFormChange} value={paymentForm.amount} name="amount" className='border-2 border-slate-800 rounded-md p-2 bg-slate-800 w-full ' type="number" placeholder='Enter Amount' />

                        <button type="button" onClick={() => payment(Number.parseInt(paymentForm.amount) * 100)} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:from-slate-600" disabled={paymentForm.name === "" || paymentForm.message === "" || paymentForm.amount === ""}>Pay</button>
                    </div>
                    <div className="text-slate-400 flex gap-3 my-4">
                        <button className='text-white bg-slate-800 p-2 hover:font-bold rounded-md' onClick={() => payment(3000)}>Pay ₹30</button>
                        <button className='text-white bg-slate-800 p-2 hover:font-bold rounded-md' onClick={() => payment(2000)}>Pay ₹20</button>
                        <button className='text-white bg-slate-800 p-2 hover:font-bold rounded-md' onClick={() => payment(1000)}>Pay ₹10</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
