import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: { user: process.env.MAILTRAP_USER, pass: process.env.MAILTRAP_PASSWORD }
    })

    const mailOption = {
        from: process.env.MAILTRAP_USER,
        to:email,
        subject:"Your OTP code for ServeBridge!",
        text: `Your OTP is ${otp}. it expires in 5 minutes`
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) console.error("Email Error:", err);
        else console.log("OTP Sent:", info.response);
    })
}