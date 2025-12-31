import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  heading: { type: String, default: "Dependable & Trusted Financial Partners" },
  subheading: { type: String, default: "Who We Are" },
  mainTitle: { type: String, default: "Navigating Financial Growth in a Fast-Paced Economy" },
  description: { type: String, default: "Whether it’s a sudden challenge..." },
  benefits: [
    {
      title: String,
      desc: String
    }
  ],
  yearsOfExcellence: { type: String, default: "10+" },
  imageUrl: { type: String, default: "https://vtdi.net/wp-content/uploads/why-cooperate-in-corporate.jpg" }
}, { timestamps: true });

export default mongoose.model("About", AboutSchema);