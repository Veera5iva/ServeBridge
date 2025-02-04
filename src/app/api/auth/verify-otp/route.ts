import { User } from "@/models/UserSchema";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req:Request){
    try {
        const {email,otp} = await req.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not Found"})
        }
        if (!user.otpExpiry || !user.otp || user.otpExpiry.getTime() < Date.now()) {
            return NextResponse.json({ message: "OTP Expired or Invalid" })
        }
        const isValidOTP = bcrypt.compare(otp,user.otp);
        if(!isValidOTP){
            return NextResponse.json({message:"Invalid OTP"})
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const session = await signIn("credentials",{redirect:false,email,password:user.password})
        if(!session){
            return NextResponse.json({message:"Failed to Verify!"})
        }
        return NextResponse.json({message:"Verification Successfull",session});
    } catch (error) {
        console.log(error);
        return NextResponse.json({Error:error});
    }
}