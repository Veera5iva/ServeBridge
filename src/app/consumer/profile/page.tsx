"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function ProfilePage() {
   const router = useRouter();
   const [data, setData] = useState("nothing");
   const logout = async () => {
      try {
         await axios.get("/api/users/logout");
         toast.success("Logout successful");
         router.push("/login");

      } catch (error) {
         if (error instanceof Error) toast.error(error.message);
         console.log("Logout error occured", error);
      }

   }

   const getUserDetails = async () => {
      const response = await axios.get("/api/users/userdata");
      console.log(response.data);
      setData(response.data.data.username);

   }
   const setLocation = async () => {
      router.push(`/consumer/location`);
   }

   const updateLocation = async () => {
      router.push(`/consumer/location`);
   }


   return (
      <div className="min-h-screen bg-gray-50 py-12">
         <Toaster position="top-right" reverseOrder={false} />

         {/* Main Container */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-8">
               <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
               <div className="mt-4">
                  <h2 className="text-xl text-gray-600">
                     {data === "nothing" ? "No data" : <Link href={`/consumer/profile/${data}`}>Visit Profile</Link>}
                  </h2>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
               <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                  onClick={getUserDetails}
               >
                  Get user details
               </button>
               <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                  onClick={logout}
               >
                  Logout
               </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
               {/* Left Column - Basic Info */}
               <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-2xl font-semibold text-black">Personal Information</h2>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                           type="text"
                           id="username"
                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                           value="JohnDoe"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                           type="email"
                           id="email"
                           className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-black"
                           value="johndoe@example.com"
                           readOnly
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                           type="text"
                           id="phone"
                           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                           placeholder="Enter phone number"
                        />
                     </div>
                  </div>
               </div>

               {/* Right Column - Location & Preferences */}
               <div className="space-y-8">
                  {/* Location Card */}
                  <div className="bg-white rounded-xl shadow-md p-8">
                     <h3 className="text-2xl font-semibold mb-4 text-black">Location</h3>
                     <p id="locationText" className="text-gray-500 mb-4">No location set</p>
                     <div className="flex gap-4">
                        <button
                           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
                           onClick={setLocation}
                        >
                           Set Location
                        </button>
                        <button
                           className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg hidden transition duration-200"
                           id="updateLocation"
                           onClick={updateLocation}
                        >
                           Update Location
                        </button>
                     </div>
                  </div>

                  {/* Preferences Card */}
                  <div className="bg-white rounded-xl shadow-md p-8">
                     <h3 className="text-2xl font-semibold mb-4 text-black">Preferences</h3>
                     <label className="flex items-center space-x-3 text-gray-700">
                        <input
                           type="checkbox"
                           id="notifications"
                           className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500 border-gray-300"
                        />
                        <span>Enable Notifications</span>
                     </label>
                  </div>
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
               <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200">
                  Save Changes
               </button>
               <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition duration-200">
                  Delete Account
               </button>
            </div>
         </div>
      </div>
   );
}