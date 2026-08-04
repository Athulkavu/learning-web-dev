import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    destinations: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'My Travel Route',
    },
    travelMode: {
      type: String,
      default: 'driving',
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Route = mongoose.model('Route', routeSchema);

export default Route;
