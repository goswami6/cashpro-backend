import mongoose from "mongoose";

const suiteSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
});

const advantageSchema = new mongoose.Schema({
  title: String,
  desc: String,
});

const corporateFundingSchema = new mongoose.Schema(
  {
    hero: {
      badge: String,
      heading: String,
      highlight: String,
      description: String,
      image: String,
      ctaText: String,
      stats: [
        {
          label: String,
          value: String,
        },
      ],
    },

    fundingSuite: [suiteSchema],

    advantages: [advantageSchema],

    process: {
      title: String,
      desc: String,
      cta: String,
      services: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CorporateFunding", corporateFundingSchema);
