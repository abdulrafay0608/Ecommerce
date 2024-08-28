import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email already exist!"],
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
