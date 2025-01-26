"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Bell, User } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface DashboardHeaderProps {
   notifications?: number
}

export default function ProviderDashboard({ notifications = 0 }: DashboardHeaderProps) {

   const [providerId, setProviderId] = useState('');
   const [announceService, setAnnounceService] = useState({
      serviceType: '',
      description: '',
      startTime: '',
      endTime: ''
   });
   const [serviceAnnounced, setServiceAnnounced] = useState(false);

   useEffect(() => {
      const getProviderId = async () => {
         try {
            const response = await axios.get("/api/users/userdata");
            setProviderId(response.data.data._id);
         } catch (error: any) {
            toast.error(error.message);
         }
      }
      getProviderId();
   }, [])


   const onAnnounceService = async (e: any) => {
      e.preventDefault();
      if(!announceService.serviceType || !announceService.description || !announceService.startTime || !announceService.endTime) return toast.error("Service details are required");
      try {
         const serviceData = {providerId, ...announceService};
         console.log(serviceData);
         if (!serviceAnnounced) {
            const response = await axios.post("/api/users/provider/announceService", serviceData);
            console.log(response.data);
            toast.success("Service announced successfully");
         } else {
            const response = await axios.delete("/api/users/provider/cancelService", { data: {providerId, serviceType: announceService.serviceType} });
            console.log(response.data);
            toast.error("Service canceled successfully");
            setAnnounceService({
               serviceType: '', 
               description: '', 
               startTime: '', 
               endTime: '' 
            });
         }
         setServiceAnnounced((prev) => !prev);
         
      } catch (error: any) {
         toast.error(error.message);
      }

   }
   return (
      <div>
         <Toaster position="top-right" reverseOrder={false}/>
         <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
               <h1 className="text-2xl font-semibold text-gray-800">Service Provider Dashboard</h1>
               <div className="flex items-center space-x-4">
                  <button className="relative rounded-full p-2 hover:bg-gray-100 focus:outline-none">
                     <Bell className="h-6 w-6 text-gray-600" />
                     {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                           {notifications}
                        </span>
                     )}
                  </button>
                  <Link href="/provider/profile" className="rounded-full hover:bg-gray-100">
                     <button className="p-2 focus:outline-none">
                        <User className="h-6 w-6 text-gray-600" />
                     </button>
                  </Link>
               </div>
            </div>
         </header>

         <div className="min-h-screen bg-gray-50 text-black">
            <main className="container mx-auto p-4">
               <div className="grid gap-6 md:grid-cols-2">
                  <div className="border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Announce Service</h2>
                     </div>
                     <div className="p-4">
                        <form className="space-y-4">
                           <div className="space-y-2">
                              <label className="block text-sm font-medium">Service Type</label>
                              <input
                                 className="w-full p-2 border rounded"
                                 placeholder="e.g. Plumbing, Food Delivery"
                                 value={announceService.serviceType}
                                 onChange={(e) => setAnnounceService({ ...announceService, serviceType: e.target.value })}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="block text-sm font-medium">Description</label>
                              <textarea
                                 className="w-full p-2 border rounded"
                                 placeholder="Describe your service..."
                                 value={announceService.description}
                                 onChange={(e) => setAnnounceService({ ...announceService, description: e.target.value })}
                              />
                           </div>
                           <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium">Start Time</label>
                                 <input
                                    type="time"
                                    className="w-full p-2 border rounded"
                                    value={announceService.startTime}
                                    onChange={(e) => setAnnounceService({ ...announceService, startTime: e.target.value })}
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium">End Time</label>
                                 <input
                                    type="time"
                                    className="w-full p-2 border rounded"
                                    value={announceService.endTime}
                                    onChange={(e) => setAnnounceService({ ...announceService, endTime: e.target.value })}
                                 />
                              </div>
                           </div>
                           <button
                              className={`w-full ${serviceAnnounced ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded`}
                              onClick={onAnnounceService}
                           > {serviceAnnounced ? "Cancel Service" : "Announce Service"}
                           </button>
                        </form>
                     </div>
                  </div>

                  <div className="border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Active Requests</h2>
                     </div>
                     <div className="p-4">
                        <div className="space-y-4">
                           <div className="rounded-lg border p-4">
                              <h3 className="font-semibold">Service Type</h3>
                              <p className="text-sm text-gray-500 mb-2">Service Description</p>
                              <div className="space-y-2 text-sm">
                                 <p className="flex items-center">👤 Consumer Name</p>
                                 <p className="flex items-center">📱 Contact Number</p>
                                 <p className="flex items-center">📍 Location</p>
                              </div>
                              <div className="mt-4 flex justify-between">
                                 <button className="border px-3 py-1 rounded text-sm">
                                    Get Directions
                                 </button>
                                 <div>
                                    <button className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm mr-2">
                                       Reject
                                    </button>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                                       Accept
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="md:col-span-2 border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Service Area Map</h2>
                     </div>
                     <div className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                           <p className="text-gray-500">Map View</p>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </div>


   )
}