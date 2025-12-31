import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
});

const stepSchema = new mongoose.Schema({
  step: String,
  title: String,
  desc: String,
});

const loanPageSchema = new mongoose.Schema(
  {
    type: { type: String, unique: true }, // home-loan, machinery-loan, lap

    hero: {
      badge: String,
      heading: String,
      highlight: String,
      description: String,
      image: String,
      ctaText: String,
      floatingStat: {
        value: String,
        label: String,
      },
    },

    benefits: [cardSchema],
    loanTypes: [cardSchema],
    process: {
      title: String,
      subtitle: String,
      steps: [stepSchema],
    },

    whyChoose: {
      title: String,
      subtitle: String,
      features: [{ title: String, desc: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("LoanPage", loanPageSchema);




