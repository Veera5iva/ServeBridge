"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
   const router = useRouter();
   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const [buttonDisabled, setButtonDisabled] = useState(true);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(user.email.trim().length > 0 && user.password.trim().length > 0) {
         setButtonDisabled(false);
      }
      else setButtonDisabled(true);
   }, [user])

   const onLogin = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/login", user)
         console.log("User logged in successfully", response.data);
         toast.success("Login success");
         router.push("/profile")
         
      } catch (error) {
         if(error instanceof Error) return toast.error(error.message);
         console.log("Login error occured", error);
      } finally {
         setLoading(false)
      }
      
   };


   return (
      <div className="flex flex-col items-center justify-center py-2 min-h-screen gap-y-1">
         <Toaster position="top-right" reverseOrder={false}/>
         <h1 className="text-3xl text-center">{loading ? "Processing" : "Login page"}</h1>
         <label htmlFor="email">email</label>
         <hr className="h-2" />
         <input
            className="p-1 rounded-lg text-black"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"

         />
         <label htmlFor="password">password</label>
         <input
            className="p-1 rounded-lg text-black"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"

         />
         <button
            className="border"
            onClick={onLogin}

         >{buttonDisabled ? "All field is required" : "Login"}
         </button>
         <Link href="/resetpasswordemail">forgot password?</Link>
         <Link href="/signup">Go to sign-up page</Link>

      </div>
   )
}