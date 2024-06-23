import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: String,
  coverImage: String,
  razorpayId: String,
  razorpaySecret: String  
}, { timestamps: true });

export default mongoose.models.User || model("User", userSchema);