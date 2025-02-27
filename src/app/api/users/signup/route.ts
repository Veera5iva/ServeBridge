import {connect} from "@/dbConfig/dbConfig"
import { Consumer, Provider } from "@/models"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
// import { sendEmail } from "@/helpers/mailer"

connect()


export async function POST (request: NextRequest) {
   try {
      const reqBody = await request.json()
      const {username, email, phone, role, password} = reqBody;

      console.log("Route coming here");
      
      console.log(reqBody);

      // check if user already exists
      if(role === "consumer") {
         const user = await Consumer.findOne({email});
         if(user) return NextResponse.json({error: "User already exists"}, {status: 400});
      }
      else if(role === "provider") {
         const user = await Provider.findOne({email});
         if(user) return NextResponse.json({error: "User already exists"}, {status: 400});
         
      }

      // hash password
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)

      if(role === "consumer") {
         const newUser =  new Consumer({ username, email, phone, password: hashedPassword })
         const savedUser = await newUser.save()
         console.log(savedUser);
      } else {
         const newUser =  new Provider({ username, email, phone, password: hashedPassword })
         const savedUser = await newUser.save()
         console.log(savedUser);
      }
      
      
      // const savedUser = await newUser.save()
      // console.log(savedUser);

      // send verifycation email
      // await sendEmail({email: email, emailType: "VERIFY", userId: savedUser._id})

      return NextResponse.json({
         message: "User created successfully",
         success: true,
      })
      
   } catch (error: unknown) {

      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'Signup error occurred' }, { status: 500 });

    }
}



