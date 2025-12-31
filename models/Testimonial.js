import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    image: { type: String, required: true }, // full URL or uploaded image
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    tag: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
