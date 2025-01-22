/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request: NextRequest) {
   try {
      const userID = await getDataFromToken(request);
      const user = await User.findById(userID).select("-password");
      return NextResponse.json({
         message: "User data fetched successfully",
         data: user
      });
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
   }
}