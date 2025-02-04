/* eslint-disable @typescript-eslint/no-explicit-any */
import { Consumer, Service } from "@/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      let { serviceId, consumerId } = reqBody;

      serviceId = new mongoose.Types.ObjectId(serviceId);
      consumerId = new mongoose.Types.ObjectId(consumerId);
      
      await Service.findByIdAndUpdate(serviceId, { $addToSet: { requestedConsumers: consumerId, status: "Requested" } });
      await Consumer.findByIdAndUpdate(consumerId, { $addToSet: { requestedServices: serviceId } });

      return NextResponse.json({ message: "Service requested successfully", success: true });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })

   }
}