import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import {google} from "googleapis";


export async function POST(req:Request) {
    try {
        const { name, email, password, phone, role } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists. Please sign in!' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOTP = await bcrypt.hash(otp, 10);

        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            otp: hashedOTP,
            otpExpiry
        });

        await sendEmail(email, otp);

        return NextResponse.json(
            { message: "User is created. An email has been sent for verification." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}



async function sendEmail(email:string,otp:string){

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

    try {
        const info = await transporter.sendMail(mailOption);
        console.log("OTP Sent:", info.response);
    } catch (err) {
        console.error("Email Error:", err);
    }
}