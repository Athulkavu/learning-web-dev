import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  uid: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;