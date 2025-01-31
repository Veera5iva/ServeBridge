import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import {google} from "googleapis";

export async function POST(req:Request) {
    try {
        const {name,email,password,phone,role} = await req.json();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:'User already exist. Please sign in!'})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const otp = Math.floor(100000 + (Math.random() * 900000)).toString();
        const otpExpiry = new Date(Date.now() + 5*(60*1000));
        await User.create(name,email,hashedPassword,role,otp,otpExpiry);
        sendEmail(email,otp);
        return NextResponse.json({message:"User is created. Email is sended to verification"})

    } catch (error) {
        console.log(error)
        return NextResponse.json({Error:error})
    }
}


function sendEmail(email:string,otp:string){

    const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        }
    })

    const mailOption = {
        from:process.env.EMAIL,
        to:email,
        subject:"Your OTP code for ServeBridge!",
        text: `Your OTP is ${otp}. it expires in 5 minutes`
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) console.error("Email Error:", err);
        else console.log("OTP Sent:", info.response);
    })
}