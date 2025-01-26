import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }],
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'In Progress', 'Completed', 'Canceled', 'Rejected'],
    default: 'Requested',
  },
}, { timestamps: true });


const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;