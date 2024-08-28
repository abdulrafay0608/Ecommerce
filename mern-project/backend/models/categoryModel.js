import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export const categoryModel = mongoose.model("Category", categorySchema);
