"use client"
import { useRouter } from "next/navigation"
export default function Home() {
   const router = useRouter();

   return (
      <div className="flex flex-row justify-center items-center min-h-screen gap-3">
         <button
            className="bg-yellow-200 text-black p-2"
            onClick={() => router.push("/provider/login")}

            >Provider
         </button>

         <button
            className="bg-yellow-200 text-black p-2"
            onClick={() => router.push("/consumer/login")}

            >Consumer
         </button>

      </div>

   )
}
