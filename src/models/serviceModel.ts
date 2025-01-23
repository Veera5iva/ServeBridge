import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', 
    required: true,
  },
  consumerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer', 
    required: true,
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'In Progress', 'Completed', 'Canceled', 'Rejected'],
    default: 'Requested',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;