import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["consumer","worker","admin"],
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const User = mongoose.model("User",userSchema);