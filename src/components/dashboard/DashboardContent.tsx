// import { useState } from "react";
import {ProviderDashboard, ConsumerDashboard, DashboardHeader} from "./index";

export default function DashboardContent() {
   // const [role, setRole] = useState("");
   const role = "provider";
   return(
      <div>
         <DashboardHeader role={role} />
         {role === "provider" ? <ProviderDashboard /> : <ConsumerDashboard />}
      </div>

   ) 
}