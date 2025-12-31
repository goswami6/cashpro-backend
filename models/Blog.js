import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String },
    image: { type: String }, // URL or uploaded path
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
