/* eslint-disable @typescript-eslint/no-explicit-any */
import Jwt  from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
   try {
      const token = request.cookies.get("token")?.value || "";
      const decodedToken: any = Jwt.verify(token, process.env.TOKEN_SECRET!);
      return decodedToken.id;
      
   } catch (error) {
      if(error instanceof Error) throw new Error(error.message);
      console.log("Error getting data from token", error);
      
   }
}

