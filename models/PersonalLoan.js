import mongoose from "mongoose";

const purposeSchema = new mongoose.Schema({
  title: String,
  icon: String,
  color: String,
  bg: String,
});

const benefitSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
});

const personalLoanSchema = new mongoose.Schema(
  {
    hero: {
      badge: String,
      heading: String,
      highlight: String,
      description: String,
      image: String,
      ctaText: String,
    },

    purposes: [purposeSchema],

    benefits: [benefitSchema],

    eligibility: {
      title: String,
      points: [String],
    },

    documents: [
      {
        category: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("PersonalLoan", personalLoanSchema);
