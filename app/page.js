"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-center text-white h-[50vh] gap-4">
      <Image src="/chai.png" alt="" width={200} height={200} />
      <div className="text-3xl font-bold">Get Me A Chai</div>
      <p className="text-lg w-1/2">Feel free to explore our curated sections, engage with fellow readers in the comments, and share your thoughts. Together, let us celebrate the richness of human experience and the limitless possibilities of the written word.</p>
      <div>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
      </div>
    </div>
  );
}
