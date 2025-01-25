import React from 'react'

export default function Dashboard() {
   return (
      <div className="min-h-screen bg-gray-50 text-black">
         <header className="border-b bg-white">
            <div className="container flex h-16 items-center justify-between px-4">
               <h1 className="text-2xl font-bold">Consumer Dashboard</h1>
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <div className="w-6 h-6 bg-gray-300"></div>
                     <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-300"></div>
               </div>
            </div>
         </header>

         <main className="container mx-auto p-4">
            <div className="grid gap-6 md:grid-cols-2">
               <div className="border rounded-lg">
                  <div className="p-4 border-b">
                     <h2 className="text-lg font-semibold">Available Services</h2>
                  </div>
                  <div className="p-4">
                     <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                           <h3 className="font-semibold">Service Type</h3>
                           <p className="text-sm text-gray-500">Service Description</p>
                           <div className="mt-2 flex items-center justify-between">
                              <span className="text-sm">10:00 AM - 12:00 PM</span>
                              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Request Service</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="border rounded-lg">
                  <div className="p-4 border-b">
                     <h2 className="text-lg font-semibold">My Requests</h2>
                  </div>
                  <div className="p-4">
                     <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                           <h3 className="font-semibold">Service Type</h3>
                           <p className="text-sm text-gray-500">Service Description</p>
                           <div className="mt-2 flex items-center justify-between">
                              <span className="text-sm">Status: Pending</span>
                              <button className="border px-3 py-1 rounded text-sm">Cancel Request</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="md:col-span-2 border rounded-lg">
                  <div className="p-4 border-b">
                     <h2 className="text-lg font-semibold">Services Near Me</h2>
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
   )
}
