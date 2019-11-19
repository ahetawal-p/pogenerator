/* eslint-disable comma-dangle */
import mongoose from 'mongoose';
import MongoPaging from 'mongo-cursor-pagination';

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    title: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    otherCity: { type: String },
    zip: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    activity: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  },
  { timestamps: true }
);
EventSchema.plugin(MongoPaging.mongoosePlugin);
const EventModel = mongoose.model('event', EventSchema);

export default EventModel;
