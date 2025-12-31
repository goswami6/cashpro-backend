import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
});

const industrySchema = new mongoose.Schema({
  name: String,
  icon: String,
});

const businessLoanSchema = new mongoose.Schema(
  {
    hero: {
      badge: String,
      heading: String,
      highlight: String,
      description: String,
      image: String,
      ctaText: String,
      stat: {
        value: String,
        label: String,
      },
    },

    products: [productSchema],

    industries: [industrySchema],

    eligibility: {
      title: String,
      points: [String],
      cardTitle: String,
      cardDesc: String,
      cardCta: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessLoan", businessLoanSchema);
