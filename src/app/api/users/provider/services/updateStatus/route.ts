/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {providerId, requestId} = reqBody;

      const service = await Service.findOne({providerId});
      
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
   }
}