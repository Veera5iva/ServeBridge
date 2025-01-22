"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
   const router = useRouter();

   const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
   });
   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(user.username.trim().length > 0 && user.email.trim().length > 0 && user.password.trim().length > 0) {
         setButtonDisabled(false);
      }
      else setButtonDisabled(true);
   }, [user])

   const onSignup = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/signup", user)
         console.log("User signed up successfully", response.data);
         router.push("/login")
         
      } catch (error : unknown) {

         console.log("Signup failed", error);
         
         if (error instanceof Error ) toast.error(error.message);
         
      } finally {
         setLoading(false);
      }
      
   };


   return (
      <div className="flex flex-col items-center justify-center py-2 min-h-screen gap-y-1">
         <Toaster position="top-right" reverseOrder={false}/>
         <h1 className="text-3xl text-center">{loading ? "Processing" : "Signup"}</h1>
         <label htmlFor="username">username</label>
         <input
            className="p-2 rounded-md text-black"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"

         />
         <label htmlFor="email">email</label>
         <input
            className="p-2 rounded-md text-black"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"

         />
         <label htmlFor="password">password</label>
         <input
            className="p-2 rounded-md text-black"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"

         />
         <button
            className="border"
            onClick={onSignup}
            
         >{buttonDisabled ? "All fields required" : "Signup"}
         </button>
         <Link href="/login">Go to login page</Link>


      </div>
   )
}