import {connect} from "@/dbConfig/dbConfig"
import { Consumer, Provider } from "@/models"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect()


export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json()
      const {email, password} = reqBody
      console.log(reqBody);

      let user = await Consumer.findOne({email})
      let role = "consumer";

      if(!user) {
         user = await Provider.findOne({email});
         role = "provider";
      } 
      if(!user) return NextResponse.json({error: "User not found"}, {status: 400});

      // check if password is correct
      const validPassword = await bcryptjs.compare(password, user.password)
      if(!validPassword) return NextResponse.json({error: "Password is invalid"}, {status: 400});

      // create token data
      const tokenData = {
         id: user._id,
         username: user.username,
         email: user.email,
         role
      }

      // create token
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

      const response = NextResponse.json({
         message: "Login successful",
         success: true,
         token,
         role
      })

      // set cookies  
      response.cookies.set("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production", // Will be `false` in development
         path: "/", // Ensure cookie is available across the app
       });

      return response;
      
   } catch (error) {

      if (error instanceof Error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'Login error occurred' }, { status: 500 });
      
   }
   
}