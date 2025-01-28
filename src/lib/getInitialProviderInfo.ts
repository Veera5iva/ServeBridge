/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProviderInfo } from "@/types/providerInfo";
import axios from "axios";


export async function getInitialProviderInfo() {
   try {
      const providerResponse = await axios.get("/api/users/userdata");
      const providerId = providerResponse.data.data._id;

      const anouncedServiceResponse = await axios.get(`/api/users/provider/services/getAnnouncedService`, { params: { providerId } });

      const { serviceType, description, startTime, endTime } = anouncedServiceResponse.data.data;

      const initialService = { serviceType, description, startTime, endTime };

      return {
         props: <ProviderInfo> {
            providerId,
            initialService
         }
      }
      
   } catch (error: any) {
      console.log(error.message);
      return {
         props: {
            providerId: "",
            initialService: null
         }
      }      
   }
}