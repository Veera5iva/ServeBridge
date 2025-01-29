import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const workProfileSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },
    category:{
        type:String,
        enum: ["plumber", "vegetable_vendor", "snacks_delivery"],
        required:true,
    },
    skills:[String],
    location:{
        type:Types.ObjectId,
        ref:"Location"
    },
    availability:{
        type:Boolean,
        default:true,
    }
})

export const WorkProfile = mongoose.model("WorkProfile",workProfileSchema);
