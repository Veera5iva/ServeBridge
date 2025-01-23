"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "@/components/PasswordInput"; 

export default function SignupPage() {
   const router = useRouter();

   const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
   });
   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [loading, setLoading] = useState(false);
   const [passwordStrength, setPasswordStrength] = useState(0);

   useEffect(() => {
      if(
         user.username.trim().length > 0 && 
         user.email.trim().length > 0 && 
         user.password.trim().length > 0 && 
         passwordStrength >= 4 
      ) {
         setButtonDisabled(false);
      }
      else setButtonDisabled(true);
   }, [user, passwordStrength])

   const onSignup = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/consumer/signup", user)
         console.log("User signed up successfully", response.data);
         toast.success("Signup Successful!");
         router.push("/consumer/login")
         
      } catch (error : unknown) {
         console.log("Signup failed", error);
         
         if (error instanceof Error ) toast.error(error.message);
         
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center py-2 min-h-screen gap-y-4 max-w-md mx-auto">
         <Toaster position="top-right" reverseOrder={false}/>
         <h1 className="text-3xl text-center">{loading ? "Processing" : "Signup"}</h1>
         
         <div className="w-full space-y-4">
            <div>
               <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
               <input
                  className="w-full p-2 rounded-md text-black"
                  type="text"
                  id="username"
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  placeholder="Enter your username"
               />
            </div>
            
            <div>
               <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
               <input
                  className="w-full p-2 rounded-md text-black"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  placeholder="Enter your email"
               />
            </div>
            
            <div>
               <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
               <PasswordInput 
                  password={user.password}
                  onPasswordChange={(password, strength) => {
                     setUser({...user, password});
                     setPasswordStrength(strength);
                  }}
               />
            </div>
            
            <button
               className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
               onClick={onSignup}
               disabled={buttonDisabled}
            >
               {buttonDisabled ? "Complete all fields" : "Signup"}
            </button>
            
            <div className="text-center">
               <Link href="/login" className="text-blue-500 hover:underline">
                  Already have an account? Go to login
               </Link>
            </div>
         </div>
      </div>
   )
}