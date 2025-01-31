/* eslint-disable @typescript-eslint/no-explicit-any */
import { Consumer, Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {serviceId, consumerId} = reqBody;

      await Service.findByIdAndUpdate(serviceId, {$push: {requestedConsumers: consumerId}});
      await Consumer.findByIdAndUpdate(consumerId, {$push: {requestedServices: serviceId}});

      return NextResponse.json({message: "Service requested successfully", success: true});
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500})
      
   }
}