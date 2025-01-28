/* eslint-disable @typescript-eslint/no-explicit-any */
// app/provider/dashboard/page.tsx
import axios from 'axios';
import Dashboard from './Dashboard';

export default async function ProviderDashboardPage() {
   console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userdata`);
   console.log(process.env.NEXT_PUBLIC_API_URL); // Ensure this prints the correct URL

   try {
      // Fetch providerId
      const providerResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/userdata`);
      console.log("Provider Response:", providerResponse.data); // Log the response data
      const providerId = providerResponse.data.data._id;
      console.log("Provider ID:", providerId);

      // Fetch announced service for the provider
      const announcedServiceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/provider/services/getAnnouncedService`, {
         params: { providerId },
      });
      console.log("Announced Service Response:", announcedServiceResponse.data); // Log the response data

      const { serviceType, description, startTime, endTime } = announcedServiceResponse.data.data;

      const announcedService = {
         serviceType,
         description,
         startTime,
         endTime
      };

      return (
         <Dashboard
            providerId={providerId}
            initialService={announcedService || null}
         />
      );
   } catch (error: any) {
      console.log("Failed to fetch data:", error.message);
      console.log("Full Error:", error);
      return <Dashboard providerId="" initialService={null} error={error.message} />;
   }
}