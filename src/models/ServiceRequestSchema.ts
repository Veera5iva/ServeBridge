import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const serviceRequestSchema = new Schema({
    consumerId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    workerId:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    serviceType:{
        type:String,
        enum: ["plumber", "vegetable_vendor", "snacks_delivery"],
        required:true,
    },
    status:{
        type:String,
        enum:["pending","accepted","completed","canceled"],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const ServiceRequest = mongoose.model("ServiceRequest",serviceRequestSchema);