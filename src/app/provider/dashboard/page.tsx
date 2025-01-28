/* eslint-disable @typescript-eslint/no-explicit-any */
// app/provider/dashboard/page.tsx
import axios from 'axios';
import Dashboard from './Dashboard';
import { headers } from 'next/headers'; // Import headers utility

export default async function ProviderDashboardPage() {
   try {
      // Access cookies from the request headers
      const headersList = await headers();
      const cookies = headersList.get('cookie'); // Get the 'cookie' header

      console.log("Cookies:", cookies); // Log cookies to ensure they are being accessed

      // Fetch providerId
      
      const providerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userdata`, {
         method: "GET",
         headers: {
            Cookie: cookies || "", // Pass cookies to the external API
         },
      });
      const providerData = await providerResponse.json();
      console.log("Provider Response:", providerData); // Log the response data

      const providerId = providerData.data._id;
      console.log("Provider ID:", providerId);

      // Fetch announced service for the provider
      const announcedServiceResponse = await axios.get(
         `${process.env.NEXT_PUBLIC_API_URL}/api/users/provider/services/getAnnouncedService`,
         {
            params: { providerId },
         }
      );
      console.log("Announced Service Response:", announcedServiceResponse.data); // Log the response data

      return (
         <Dashboard
            providerId={providerId}
            initialService={null}
         />
      );
   } catch (error: any) {
      console.log("Failed to fetch data:", error.message);
      console.log("Full Error:", error);
      return <Dashboard providerId="" initialService={null} error={error.message} />;
   }
}
