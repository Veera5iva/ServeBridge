import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
   },
   email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
   },
   password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"]
   },
   role: {
      type: String,
      enum: ["consumer", "provider", "admin"],
      default: "consumer"
   },
   location: {
      type: {
         type: String,
         enum: ["Point"],
         default: "Point"
      },
      coordinates: {
         type: [Number], // [longitude, latitude]
         required: false
      }
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   profile: {
      phone: {
         type: String,
         required: false,
         match: [/^\d{10}$/, "Please provide a valid phone number"]
      },
      bio: {
         type: String,
         maxlength: 500 // Limit the bio length
      }
   },
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date,
   verifyToken: String,
   verifyTokenExpiry: Date,
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("User", userSchema)

export default User