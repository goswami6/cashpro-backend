import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, // URL or uploaded image path
    },
    type: {
      type: String,
      enum: ["url", "upload"],
      default: "upload",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSlide", heroSlideSchema);
