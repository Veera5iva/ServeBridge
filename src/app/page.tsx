"use client"
import { useRouter } from "next/navigation"
export default function Home() {
   const router = useRouter();

   return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-3">
         <h1 className="text-6xl">ServeBridge</h1>
         <button
            className="bg-yellow-200 text-black p-2"
            onClick={() => router.push("/login")}

            >Login
         </button>

         <button
            className="bg-yellow-200 text-black p-2"
            onClick={() => router.push("/signup")}

            >Signup
         </button>

      </div>

   )
}
