"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import "../app/globals.css"

const Navbar = () => {
    const { data: session } = useSession()

    const [showDropdown, setShowDropdown] = useState(false)
    const handleData = () => {
        console.log("handleData")
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropdownItemClick = () => {
        setShowDropdown(false); // Close dropdown when any dropdown item is clicked
    };

    const handleSignOut = () => {
        handleDropdownItemClick(); // Close dropdown before signing out
        signOut();
    };

    return (
        <nav className='flex justify-between bg-black text-white px-5 py-3 items-center'>
            <Link href={"/"}>
                <div className='text-2xl font-bold flex'>
                    <Image src="/chai.png" alt="" width={30} height={30} />
                    <span className='text-red-500 pl-1'>C</span><span>hai</span>

                </div>
            </Link>
            {/* <ul className='flex gap-4'>
                <Link href={"/"} className='cursor-pointer hover:text-slate-400 font-bold'>Home</Link>
                <Link href={"/about"} className='cursor-pointer hover:text-slate-400 font-bold'>About</Link>
                <Link href={"/contact"} className='cursor-pointer hover:text-slate-400 font-bold'>Contact</Link>
                <Link href={"/login"} className='cursor-pointer hover:text-slate-400 font-bold'>Login</Link>
                <Link href={"/register"} className='cursor-pointer hover:text-slate-400 font-bold'>Register</Link>
            </ul> */}

            <div className='flex justify-center items-center relative'>
                {session && <>
                    <div>
                        <button onClick={() => setShowDropdown(!showDropdown)} id="dropdownDefaultButton" className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.name}<svg className="mx-2 w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>

                        <div id="dropdown" ref={dropdownRef} className={`mx-2 z-10 ${showDropdown ? '' : 'hidden'} absolute w-[12vw] mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700`}>
                            <ul className="mx-2 py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="mx-2 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDropdownItemClick}>Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="#" className="mx-2 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDropdownItemClick}>Settings</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.name}`}  className="mx-2 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDropdownItemClick}>Your page</Link>
                                </li>
                                <li>
                                    <Link href="/" className="mx-2 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleSignOut}>Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>}
                {session &&
                    <button type="button" className="mx-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => signOut()}>Logout</button>
                }
                {!session &&
                    <Link href="/login">
                        <button type="button" className="mx-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                    </Link>
                }
            </div>
        </nav>
    )
}

export default Navbar
