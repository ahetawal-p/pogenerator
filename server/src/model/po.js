/* eslint-disable comma-dangle */
import mongoose from 'mongoose';

const { Schema } = mongoose;
const POSchema = new Schema(
  {
    createdOn: { type: Date, required: true },
    createdBy: { type: String, required: true },
    poNumber: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    projectName: { type: String, required: true },
    localizePM: { type: String, required: true },
    clientName: { type: String },
    clientPM: { type: Number, required: true },
    vendorName: { type: String, required: true },
    vendorMailId: { type: String, required: true },
    workType: { type: String, required: true },
    language: { type: String, required: true },
    wordCount: { type: String, required: true },
    vendorCost: { type: String, required: true },
    currency: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true }
  },
  { timestamps: { createdAt: 'systemCreateOn', updatedAt: 'modifiedOn' } }
);
const POModel = mongoose.model('poentry', POSchema);

export default POModel;
